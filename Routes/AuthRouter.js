const express = require("express");
const router = express.Router();

const { signup, login, logout } = require("../Controllers/AuthControllers");

const {
  signupValidation,
  loginValidation,
} = require("../Middlewares/AuthMiddlewares");

router.post("/signup", signupValidation, signup);
router.post("/login", loginValidation, login);
// router.post("/logout", logout);

module.exports = router;
