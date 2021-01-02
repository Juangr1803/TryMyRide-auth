// Passport
const passport = require('passport');
const { BasicStrategy } = require('passport-http');
// Boom Handler error
const boom = require('@hapi/boom');
// Bcrypt
const bcrypt = require('bcrypt');
// Services
const UsersService = require('../../../services/users');
const usersService = new UsersService();

//-------------------------------------//
//-------------------------------------//

passport.use(
  new BasicStrategy(async (email, password, cb) => {
    try {
      const user = await usersService.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })
);
