const logger = require("../utils/logger");

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  logger(
    {
      message: err.message,
      stackTrace: err.stack,
      status: statusCode,
    },
    "server error"
  );
  res.errorResponse(statusCode, err.message ?? "Something went wrong! Please try again after some time.", err.stack);
};
