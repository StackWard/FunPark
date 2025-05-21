const app = require("./app");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// Read config file
dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";
const DB = process.env.DATABASE;

// Initialize Database Connection
mongoose.connect(DB).then((con) => {
  console.log("DB Connected!");
});

// Run the Server
app.listen(PORT, HOSTNAME, () => {
  console.log(`Listening on http://${HOSTNAME}:${PORT}`);
});
