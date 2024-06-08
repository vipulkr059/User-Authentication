const { body } = require("express-validator");

const registerValidation = [
  body("firstName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First Name is required"),
  body("lastName")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last Name is required"),
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

const loginValidation = [
  body("email").isEmail().withMessage("Invalid email format").normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
];

module.exports = {
  registerValidation,
  loginValidation,
};
