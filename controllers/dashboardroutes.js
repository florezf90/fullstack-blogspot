const router = require("express").Router();
const sequelize = require("../config/connection");
const { Post, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    const dbPostdata = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "date_posted", "content"],
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

    // serialize data before passing to template
    const posts = dbPostdata.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, loggedIn: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /dashboard/edit/:id
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "date_posted", "content"],
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

    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }

    // serialize the data
    const post = dbPostData.get({ plain: true });

    res.render("edit-post", { post, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET /dashboard/create
router.get("/create/", withAuth, async (req, res) => {
  try {
    const dbPostData = await Post.findAll({
      where: {
        // use the ID from the session
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "date_posted", "content"],
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

    // serialize data before passing to template
    const posts = dbPostData.map((post) => post.get({ plain: true }));

    res.render("create-post", { posts, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
