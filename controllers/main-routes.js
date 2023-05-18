const router = require("express").Router();
const { User, Comment, Post } = require("../models");

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

    res.status(200).render("home", { posts });
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
      include: [{ model: User, attributes: ["user_name"] }, { model: Comment, include: [{ model: User, attributes: ['user_name']}] }],
    });
    if (!postRaw) {
      res.status(404).render("404");
    }
    const post = postRaw.get({plain: true})
    
    res.status(200).render("viewpost", { post });
  } catch (err) {
    res.status(500).json({ message: `Error getting post from database.` });
  }
});

module.exports = router;
