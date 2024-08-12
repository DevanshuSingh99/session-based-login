const express = require("express");
const { body, validationResult } = require("express-validator");

const userValidator = {
  createUser: [
    body("mobile").isLength({ min: 10, max: 10 }).withMessage("Invalid mobile number"),
    body("user_name").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.validationErrorResponse(errors);
      }
      next();
    },
  ],
  login: [
    body("mobile").isLength({ min: 10, max: 10 }).withMessage("Invalid mobile number"),
    body("user_name").isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.validationErrorResponse(errors);
      }
      next();
    },
  ],
};

module.exports = userValidator;
