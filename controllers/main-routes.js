const router = require("express").Router();
const { User, Comment, Post } = require("../models");

// route: /
// homepage
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.findAll({ include: [{ model: User, attributes: ['user_name'] }, {model: Comment}]} );
    
    if (!allPosts) {
      return res.status(404).send("No posts.");
    }
console.log(allPosts)
    const posts = allPosts.map(post => post.get({ plain: true}))
    console.log(posts)
    res.status(200).render("home", { posts });
  } catch (err) {
    res.status(500).json({ message: `Error loading data: ${err}` });
  }
});

module.exports = router;
