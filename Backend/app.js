const express = require("express");
const morgan = require("morgan");
const ticketRouter = require("./routes/ticketRoute");
const orderRouter = require("./routes/orderRoute");
const authRouter = require("./routes/authRoute");

const app = express();

// MIDDLEWARES
app.use(express.json()); // Parse JSON
app.use(express.static("public")); // Static files
app.use(morgan("dev")); // Just for Logging

// ROUTES
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/login", authRouter);

module.exports = app;
