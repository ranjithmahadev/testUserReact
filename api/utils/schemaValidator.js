const Joi = require("joi");

const userSchema = {
  userName: Joi.string().trim().required(),
  givenName: Joi.string().trim().allow(null, ""),
  surName: Joi.string().trim().allow(null, ""),
  dob: Joi.string().trim().allow(null, "")
};

exports.validateUser = (user) => Joi.validate(user, userSchema);
