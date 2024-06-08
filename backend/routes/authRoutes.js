const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/authValidators");
const { validate } = require("../middlewares/validate");
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);

module.exports = router;
