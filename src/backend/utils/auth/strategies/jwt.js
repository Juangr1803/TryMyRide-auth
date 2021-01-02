// Passport
const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
// Boom
const boom = require('@hapi/boom');
// Services
const UsersService = require('../../../services/users');
const usersService = new UsersService();
// Config
const config = require('../../../config');

//------------------------------------------//
//------------------------------------------//

// Stategy (jwtSecret, where is jwt)
passport.use(
  new Strategy(
    {
      // SecretKet
      secretOrKey: config.authJwtSecret,
      // Jwt from header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (tokenPayload, cb) => {
      try {
        const user = await usersService.getUser({ email: tokenPayload });

        if (!user) {
          return cb(boom.unauthorized(), false);
        }

        delete user.password;

        cb(null, { ...user, scopes: tokenPayload });
      } catch (err) {
        return err;
      }
    }
  )
);
