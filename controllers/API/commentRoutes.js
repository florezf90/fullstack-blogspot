const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try {
    const dbCommentData = await Comment.findAll({});
    res.json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    if (req.session) {
      const dbCommentData = await Comment.create({
        content: req.body.content,
        post_id: req.body.post_id,
        user_id: req.session.user_id,
      });
      res.json(dbCommentData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const dbCommentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbCommentData) {
      res.status(404).json({ message: "No comment found with this ID" });
      return;
    }
    res, json(dbCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
