const joi = require('@hapi/joi');

// User id
const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserSchema = {
  name: joi.string().max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  isAdmin: joi.boolean(),
};

const updateUserSchema = {
  name: joi.string().max(100),
  email: joi.string().email(),
  password: joi.string(),
  picture: joi.string(),
  isAdmin: joi.boolean(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
};
