const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

// Reading config file
dotenv.config({ path: "./config.env" });

exports.checkRole = (req, res, next) => {
  const role = req.userData.user.role;
  if (role !== "admin") {
    return res.status(401).json({ error: "You are Not Authorized to do this action" });
  }
};

exports.verifyToken = (req, res, next) => {
  // Check if the request has Authorization Header
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Not Authorized" });
  }

  // Extract the JWT Token from the header
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  // Check if the token exists
  if (!token) return res.status(401).json({ error: "Token missing" });

  try {
    // Verifing the user's JWT
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    // Add JWT's data to the request object
    req.userData = payload;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
