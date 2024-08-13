const express = require("express");
const { body, validationResult, query } = require("express-validator");

const adminValidator = {
  login: [
    body("password")
      .isLength({ min: 3 })
      .withMessage("Password must be at least 3 characters long"),
    body("user_name")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.validationErrorResponse(errors);
      }
      next();
    },
  ],
  getUserDetails: [
    query("userId")
      .isLength({ max: 24, min: 24 })
      .withMessage("Invalid user id."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.validationErrorResponse(errors);
      }
      next();
    },
  ],
};

module.exports = adminValidator;
