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
    }
    
    res.status(200).redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: `Error connecting to db: ${err}` });
  }
});

module.exports = router;
