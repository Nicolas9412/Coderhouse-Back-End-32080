const { check } = require("express-validator");
const { validateResult } = require("../utils/validateUtil");

const validateRegister = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email invalid format"),
  check("fullname")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Fullname is required"),
  check("phoneNumber")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Phone number is required"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 chars long"),
  check("confirmPassword")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Confirm Password is required")
    .isLength({ min: 5 })
    .withMessage("Confirm Password must be at least 5 chars long"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validateLogin = [
  check("email")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email invalid format"),
  check("password")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Password is required"),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateRegister, validateLogin };
