const router = require("express").Router();

const apiModule = require("./api/index.js");
const homeRoutes = require("./home-routes.js");
const dashboardRoutes = require("./dashboard-routes.js");

router.use("/api", apiModule);
router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
