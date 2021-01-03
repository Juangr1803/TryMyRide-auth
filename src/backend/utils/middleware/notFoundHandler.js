const boom = require('@hapi/boom');

// Function for catch error 404
const notFoundHandler = (req, res) => {
  // The request format with error boom
  const {
    output: { statusCode, payload },
  } = boom.notFound();
  res.status(statusCode);
  res.json(payload);
};

module.exports = notFoundHandler;
