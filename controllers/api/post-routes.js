const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const checkAuth = require("../../utils/auth");

router.post("/new", checkAuth, async (req, res) => {
  try {
    const newPost = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id,
    };

    console.log(newPost);

    const submitted = await Post.create(newPost);

    if (!submitted) {
      res.status(404).json({ message: `Error making post.` });
      return;
    }

    res.status(200).redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error connecting to db: ${err}` });
  }
});

router.put("/edit/:id", checkAuth, async (req, res) => {
  try {
    const editedPost = await Post.update(req.body, {
      where: { id: req.params.id },
    });
    
    if (!editedPost) {
      res.status(404).json({ message: `No post with that id found.` });
      return;
    }

    res.status(200).json(editedPost);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error updating post on the db.`, err });
  }
});

router.delete("/delete/:id", checkAuth, async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    
    if (!post) {
      res.status(404).json({ message: `No post with that id found.` });
      return;
    }
    
    await post.destroy();

    res.status(200).json({message: `Post successfully deleted.`});
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error deleting post on the db.`, err });
  }
});

module.exports = router;
