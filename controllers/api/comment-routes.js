const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const checkAuth = require("../../utils/auth");

router.post("/", checkAuth, async (req, res) => {
  try {
    let user_id = req.session.user_id;
    let { message, post_id } = req.body;

    const newComment = await Comment.create({ message, user_id, post_id });

    if (!newComment) {
      res.status(404).json({ message: `Error creating new comment.` });
      return;
    }

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error posting comment to db.", err });
  }
});

router.delete("/:id", checkAuth, async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);

    if (!comment) {
      res.status(404).json({ message: `No comment with that id found.` });
      return;
    }

    await comment.destroy();

    res.status(200).json({ message: `Comment successfully deleted.` });
  } catch (err) {
    console.log(err);
    res.status(200).json({ message: `Error deleteing comment from db.`, err });
  }
});
module.exports = router;
