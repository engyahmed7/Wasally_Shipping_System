const Joi = require('joi');
const { password, phoneNumber } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    password: Joi.string().required().custom(password),
    confirmpassword: Joi.string().required().custom(password),
    name: Joi.string().required(),
    birthDate: Joi.date(),
    role: Joi.string().valid('user', 'admin'),
    city: Joi.string(),
    governorate: Joi.string(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email({ tlds: { allow: false } }).required(),
  }),
};

const resetPassword = {
  params: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
