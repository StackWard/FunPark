const jsonwebtoken = require("jsonwebtoken");
const dotenv = require("dotenv");

// Reading config file.
dotenv.config({ path: "./config.env" });
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT Token.
exports.generateToken = (req, res) => {
  // Extract username, password from request body.
  const { username, password } = req.body;
  console.log(`${username} is trying to login ..`);

  // Verify username & password.
  if (username === "admin" && password === "admin@12345") {
    // Generate a JWT based on the valid credentials.
    return res.json({
      token: jsonwebtoken.sign(
        {
          user: {
            id: 1,
            username: "admin",
            name: "مدیر",
            avatar: "http://127.0.0.1:8000/avatar.jpg",
            role: "test",
          },
        },
        JWT_SECRET
      ),
      success: true,
    });
  }

  if (username === "guest" && password === "guest") {
    // Generate a JWT based on the valid credentials.
    return res.json({
      token: jsonwebtoken.sign(
        {
          user: {
            id: 2,
            username: "guest",
            name: "مهمان",
            avatar: "http://127.0.0.1:8000/avatar.jpg",
            role: "guest",
          },
        },
        JWT_SECRET
      ),
      success: true,
    });
  }
  return res.status(401).json({ message: "The username and password your provided are invalid" });
};

// fetching user's data by JWT token (It Needs Auth!).
exports.getTokenDetails = (req, res) => {
  return res.status(200).json({
    token: req.userData.token,
    user: req.userData.user,
    success: req.userData.success,
  });
};
