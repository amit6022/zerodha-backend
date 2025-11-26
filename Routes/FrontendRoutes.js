const frontendControllers = require("../Controllers/frontendControllers");

const express = require("express");
const router = express.Router();

router.route("/allHoldings").get(frontendControllers.holdings);

router.route("/allPositions").get(frontendControllers.positions);

router.route("/newOrder").post(frontendControllers.newOrder);

router.route("/allOrders").get(frontendControllers.orders);

module.exports = router;
