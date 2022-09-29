/* eslint-disable max-len */
const Joi = require('joi');

const regexValidator = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),

  password: Joi.string()
    .pattern(
      regexValidator,
    )
    .required(),

});

const registerValidation = (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: 'password must have at least 1 uppercase character, 1 number. Also a minimum of 6 characters ' });
  }
  next();
  return null;
};

module.exports = {
  registerValidation,
};
