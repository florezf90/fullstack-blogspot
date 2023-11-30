const router = require("express").Router();

const apiRoutes = require("./API");
const homeroutes = require("./home-routes");
const dashboardRoutes = require("./dashboardroutes");

router.use("/", homeroutes);
router.use("/api", apiRoutes);
router.use("/dashboard", dashboardRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
