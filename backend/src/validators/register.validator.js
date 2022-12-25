const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  fullname: Joi.string().min(3).max(50).required(),
  phoneNumber: Joi.number().required(),
  password: Joi.string().min(5).required(),
  confirmPassword: Joi.string().min(5).required(),
});

module.exports = registerSchema;
