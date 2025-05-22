const express = require("express");
const ticketRouter = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const Router = express.Router();

// I used middleware to handle user authentication.

Router.route("/")
  .get(ticketRouter.getAllTickets)
  .post(authMiddleware.verifyToken, authMiddleware.checkRole, ticketRouter.createTicket);

Router.route("/:id")
  .delete(authMiddleware.verifyToken, authMiddleware.checkRole, ticketRouter.deleteTicket)
  .put(authMiddleware.verifyToken, authMiddleware.checkRole, ticketRouter.updateTicket);

module.exports = Router;
