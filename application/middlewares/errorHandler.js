const { internalServerError } = require('../constants');

module.exports.errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message = internalServerError } = err;
  res.status(statusCode).send({ message: message });
}
