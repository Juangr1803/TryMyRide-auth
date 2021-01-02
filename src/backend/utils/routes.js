const auth = require('../routes/auth');

const routes = (server) => {
  server.use('/api/auth', auth);
};

module.exports = routes;
