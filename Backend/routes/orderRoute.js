const express = require("express");
const orderRouter = require("../controllers/orderController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .post(orderRouter.createOrder)
  .get(authMiddleware.verifyToken, orderRouter.getAllOrders);

router.route("/status").get(authMiddleware.verifyToken, orderRouter.ordersStatus);

router
  .route("/:id")
  .get(orderRouter.getOrder)
  .delete(authMiddleware.verifyToken, orderRouter.deleteOrder);

module.exports = router;
