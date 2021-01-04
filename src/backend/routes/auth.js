// Express
const express = require('express');
const router = express.Router();
// Response
const response = require('../utils/response');
// Services
const UsersService = require('../services/users');
const usersService = new UsersService();
const ApiKeysService = require('../services/apiKeys');
const apiKeysService = new ApiKeysService();
// Boom
const boom = require('@hapi/boom');
// Passport
const passport = require('passport');
// JWT
const jwt = require('jsonwebtoken');
// Validation
const validationHandler = require('../utils/middleware/validationHandler');
// Schemas
const {
  userIdSchema,
  createUserSchema,
  updateUserSchema,
} = require('../utils/schemas/users');
// Config
const config = require('../config');
// Basic strategy
require('../utils/auth/strategies/basic');

//-----------------------------------------//
//-----------------------------------------//

// POST Sign-in
router.post('/sign-in', async (req, res, next) => {
  // Passport
  passport.authenticate('basic', (err, user) => {
    try {
      if (!user) {
        response.error(
          req,
          res,
          'Email or Password invalid',
          401,
          boom.unauthorized()
        );
        next(boom.unauthorized());
      }

      // Login
      req.login(user, { session: false }, async (err) => {
        if (err) {
          response.error(
            req,
            res,
            'Email or Password invalid',
            401,
            boom.unauthorized()
          );
          next(err);
        }

        const { _id: id, name, email } = user;

        const payload = {
          sub: id,
          name,
          email,
        };

        const token = jwt.sign(payload, config.authJwtSecret, {
          expiresIn: '15m',
        });

        response.success(
          req,
          res,
          { token, user: { id, name, email } },
          201,
          'user login'
        );
      });
    } catch (err) {
      response.error(req, res, 'Internal error', 500, err);
      next(err);
    }
  })(req, res, next);
});

// POST Sign-up
router.post(
  '/sign-up',
  validationHandler(createUserSchema),
  async (req, res, next) => {
    const { body: user } = req;

    try {
      const createdUserId = await usersService.createUser({ user });

      response.success(req, res, createdUserId, 201, 'user created');
    } catch (err) {
      response.error(req, res, 'Internal error', 500, err);
      next(err);
    }
  }
);

// PUT
router.put(
  '/updated-data/:userId',
  validationHandler({ userId: userIdSchema }, 'params'),
  validationHandler(updateUserSchema),
  async (req, res, next) => {
    const { userId } = req.params;
    const { body: user } = req;

    try {
      const updateUserId = await usersService.updateUser({
        userId,
        user,
      });

      response.success(req, res, updateUserId, 200, 'user updated');
    } catch (err) {
      response.error(req, res, 'Internal error', 500, err);
      next(err);
    }
  }
);

module.exports = router;
