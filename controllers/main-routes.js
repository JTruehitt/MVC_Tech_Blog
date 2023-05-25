const router = require("express").Router();
const { User, Comment, Post } = require("../models");
const checkAuth = require('../utils/auth')

// route: /
// method: GET
// view: homepage
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({
      include: [{ model: User, attributes: ["user_name"] }, { model: Comment }],
    });

    if (!allPosts) {
      return res.status(404).send("No posts.");
    }

    const posts = allPosts.map((post) => post.get({ plain: true }));

    res.status(200).render("home", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json({ message: `Error loading data: ${err}` });
  }
});

// route: /post/:id
// method: GET
// view: one post
router.get("/post/:id", async (req, res) => {
  try {
    const postRaw = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["user_name"] },
        {
          model: Comment,
          include: [{ model: User, attributes: ["user_name"] }],
        },
      ],
    });
    if (!postRaw) {
      res.status(404).render("404");
    }
    const post = postRaw.get({ plain: true });

    post.comments.forEach((comment) => {
      comment.deletable = (comment.user_id === req.session.user_id)
    })

    res.status(200).render("viewpost", { post, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } catch (err) {
    res.status(500).json({ message: `Error getting post from database.`, err});
  }
});

router.get("/post/edit/:id", checkAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: `No post with that id.` });
    }

    const post = postData.get({ plain: true });
    res.status(200).render("editpost", { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error fetching post from db.`, err });
  }
});

router.get('/newpost', checkAuth, (req, res) => {
  try {
    res.status(200).render('createpost')
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error loading post form.`, err})
  }
})

router.get("/dashboard", checkAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({ where: { user_id: req.session.user_id } });
    if (!postData) {
      res.status(404).json({ message: `You haven't made any posts.` });
    }
    const posts = postData.map((post) => post.get({ plain: true }));
    res.status(200).render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error getting data from db: ${err}` });
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

module.exports = router;
