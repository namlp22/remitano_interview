const express = require("express");
const jwt = require("jsonwebtoken");
const authRouter = express.Router();
const auth_controller = require("../controllers/authController");

// Login/Register
authRouter.post("/login-register", (req, res) => {
  auth_controller.post_login_register(req, res);
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    try {
      const payload = jwt.verify(token, process.env.SECRET_KEY);
      req.user = payload;
      next();
    } catch (err) {
      res.status(401).json({ error: "Invalid token" });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  authRouter,
  authenticateJWT,
};
