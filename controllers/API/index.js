const path = require("path");
console.log("__dirname:", __dirname);

const router = require("express").Router();

const User = require("./User-routes.js");
const postRoutes = require("../API/post-routes.js");
const commentRoutes = require("../API/comment-routes.js");

router.use("/users", User);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);

module.exports = router;
