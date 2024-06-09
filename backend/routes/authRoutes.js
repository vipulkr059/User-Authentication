const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/authValidators");
const { validate } = require("../middlewares/validate");
const { authorization } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerValidation, validate, registerUser);
router.post("/login", loginValidation, validate, loginUser);
router.get("/user", authorization, (req, res) => {
  res.json(req.user);
});

module.exports = router;
