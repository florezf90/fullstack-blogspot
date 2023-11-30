const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");
const sequelize = require("../../config/connection");

router.get("/", async (req, res) => {
  try {
    // gets all the posts and JOIN with user data
    const dbpostData = await Post.findAll({
      attributes: ["id", "title", "date_posted", "content"],
      order: [["created_at", "DESC"]],
      include: [
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "date_posted"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    res.json(dbpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", withAuth, async (req, res) => {
  try {
    const dbpostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "date_posted", "content"],
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "post_id", "user_id", "date_posted"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });
    if (!dbpostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.json(dbpostData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const dbpostData = await Post.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });

    res.json(dbpostData);
  } catch (errr) {
    res.status(500).json(err);
  }
});

router.put("/:id", withAuth, async (req, res) => {
  try {
    const [rowsaffected, [updatedPost]] = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    );

    if (rowsaffected === 0) {
      res.status(404).json({ message: "No post found with this ID" });
      return;
    }
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const rowsaffected = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsaffected === 0) {
      res.status(404).json({ message: "No post found with this ID" });
      return;
    }
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
