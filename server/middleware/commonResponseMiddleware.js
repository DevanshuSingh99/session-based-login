const logger = require("../utils/logger");

require("dotenv").config();

function commonResponseMiddleware(req, res, next) {
  /**
   * Function to send the response in a consistent format
   *
   * @param {Object} data - The data to be returned
   * @param {number} status - The HTTP status code to be returned
   * @param {string|Object|Array} message - The message to be returned
   *
   */
  res.apiResponse = (status, message, data = null) => {
    const response = {
      status: "success",
    };

    if (!(typeof message == "string")) {
      response.data = message;
    } else {
      response.message = message;
    }

    if (data) {
      response.data = data;
    }

    res.status(status).json(response);
  };

  /**
   * Function to send an error response in a consistent format
   *
   * @param {string} message - The error message to be displayed
   * @param {number} status - The HTTP status code to be returned
   */
  res.errorResponse = (status = 500, message = "Something went wrong! Please try again after some time.", stackTrace = null, data = {}) => {
    const response = {
      status: "error",
      message: message,
      ...data,
    };
    logger(
      {
        message: message,
        stackTrace: stackTrace,
        status: status,
      },
      "error"
    );
    res.status(status).json(response);
  };

  /**
   * Function to send a validation error response
   *
   * @param {Object} errors - An object containing the validation errors
   * @param {string} message - The error message to be displayed
   * @param {number} status - The HTTP status code to be returned
   */
  res.validationErrorResponse = (errors = {}, message = "Validation Error", status = 422) => {
    res.status(status).json({
      type: "validation-error",
      message,
      errors,
    });
  };

  next();
}

module.exports = commonResponseMiddleware;
