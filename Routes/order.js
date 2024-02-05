const express = require("express");
const router = express.Router();
const order = require("../Controllers/order");
const Auth = require("../Controllers/Auth");

router
  .route("/")
  .get(order.getAllOrders)
  .post(Auth.checkAuthUser, order.createOrder);
router
  .route("/:id")
  .get(order.getOrder)
  .post(order.updateOrder)
  .delete(order.deleteOrder);

module.exports = router;
