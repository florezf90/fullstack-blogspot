const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/post/:id", withAuth, async (req, res) => {
  try {
    await Comment.create({
      content: req.body.commentData.content,
      user_id: req.session.user_id,
      post_id: req.body.commentData.post_id,
    });

    const postCommentData = await Post.findAll({
      where: { id: req.params.id },
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["content", "date_posted"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const postComments = postCommentData.map((postcomment) =>
      postcomment.get({ plain: true })
    );
    res.render("comment", {
      ...postComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
