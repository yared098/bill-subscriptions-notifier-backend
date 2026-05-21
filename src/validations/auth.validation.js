const { body } = require("express-validator");

const registerValidation = [
  body("fullName").notEmpty().withMessage("Name required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6+ chars"),
];

module.exports = {
  registerValidation,
};