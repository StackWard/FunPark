const express = require("express");
const authController = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(authMiddleware.verifyToken, authController.getTokenDetails)
  .post(authController.generateToken);

module.exports = router;
