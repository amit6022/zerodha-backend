const HoldingsModel = require("../Model/HoldingsModel.js");
const PositionsModel = require("../Model/PositionsModel.js");
const OrdersModel = require("../Model/OrdersModel.js");

module.exports.holdings = async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
};

module.exports.positions = async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
};

module.exports.newOrder = async (req, res) => {
  try {
    let newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();

    //add newOrder Data in Holdings
    let newHolding = new HoldingsModel({
      name: newOrder.name,
      qty: newOrder.qty,
      avg: 538.05,
      price: newOrder.price,
      net: "+0.58%",
      day: "+2.99%",
    });

    console.log("newHolding = " + newHolding);
    await newHolding.save();

    res.send("!Done ordersData");
  } catch (error) {
    console.error("Error Saving Order or holding", error);
    res.status(500).send("something went wrong");
  }
};

module.exports.orders = async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
};
