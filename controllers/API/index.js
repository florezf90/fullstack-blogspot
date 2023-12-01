const path = require("path");
console.log("__dirname:", __dirname);

const router = require("express").Router();

const userRoutes = require("./User-routes.js");
const postRoutes = require("./post-routes.js");
const commentRoutes = require("./comment-routes.js");

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
