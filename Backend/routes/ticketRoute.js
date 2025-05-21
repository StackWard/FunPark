const express = require("express");
const ticketRouter = require("../controllers/ticketController");
const authMiddleware = require("../middleware/authMiddleware");

const Router = express.Router();

// I used middleware to handle user authentication.

Router.route("/")
  .get(ticketRouter.getAllTickets)
  .post(authMiddleware.verifyToken, ticketRouter.createTicket);

Router.route("/:id")
  .delete(authMiddleware.verifyToken, ticketRouter.deleteTicket)
  .put(authMiddleware.verifyToken, ticketRouter.updateTicket);
module.exports = Router;
