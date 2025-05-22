const express = require("express");
const morgan = require("morgan");
const ticketRouter = require("./routes/ticketRoute");
const orderRouter = require("./routes/orderRoute");
const authRouter = require("./routes/authRoute");

const app = express();

// This section is just for bypassing the browser SOP.
// If you want to run this project on the client side,
// just uncomment this code:

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header("Access-Control-Expose-Headers", "X-Api-Version, X-Request-Id, X-Response-Time");
//   res.header("Access-Control-Max-Age", "1000");

//   next();
// });

// MIDDLEWARES
app.use(express.json()); // Parse JSON
app.use(express.static("public")); // Static files
app.use(morgan("dev")); // Just for Logging

// ROUTES
app.use("/api/v1/tickets", ticketRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/login", authRouter);

module.exports = app;
