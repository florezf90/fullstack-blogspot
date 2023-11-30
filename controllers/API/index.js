const router = require("express").Router();
const userRoutes = require("./user-routes");
const commentROutes = require("./commentRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentROutes);

module.exports = router;
