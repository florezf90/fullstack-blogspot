const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const dbUserdata = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    res.json(dbUserdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/users/1
router.get("/:id", async (req, res) => {
  try {
    const dbUserdata = await User.findOne({
      attributes: { exclude: ["password"] },
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Post,
          attributes: ["id", "title", "content", "date_posted"],
        },
        {
          model: Comment,
          attributes: ["id", "content", "date_posted"],
          include: {
            model: Post,
            attributes: ["title"],
          },
        },
      ],
    });

    if (!dbUserdata) {
      res.status(404).json({ message: "No user found with this ID" });
      return;
    }
    res.json(dbUserdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/users
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect password or email, please try again!" });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect password or email, please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// POST /api/users/logout
router.post("/logout", async (req, res) => {
  try {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// PUT /api/users/1
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [rowsAffected] = await User.update(req.body, {
      individualHooks: true,
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected === 0) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json({ message: "User updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const rowsAffected = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (rowsAffected === 0) {
      res.status(404).json({ message: "No user found with this id" });
      return;
    }

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
