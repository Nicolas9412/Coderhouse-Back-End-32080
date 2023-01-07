const { check } = require("express-validator");
const { validateResult } = require("../utils/validateUtil");

const validateProduct = [
  check("title").exists().not().isEmpty().withMessage("Title is required"),
  check("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Description is required"),
  check("stock").exists().not().isEmpty().withMessage("Stock is required"),
  check("price").exists().not().isEmpty().withMessage("Price is required"),
  check("thumbnail")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Thumbnail is required"),

  check("category")
    .exists()
    .not()
    .isEmpty()
    .withMessage("Category is required"),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validateProduct };
