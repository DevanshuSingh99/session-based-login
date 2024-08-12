const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const loginReportSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CONSTANTS.SCHEMA_NAMES.USER, // References the User model
    required: true,
  },
  session_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: CONSTANTS.SCHEMA_NAMES.SESSION, // References the User model
    required: true,
  },
});

const LoginReport = mongoose.model(CONSTANTS.SCHEMA_NAMES.LOGIN_REPORT, loginReportSchema);

module.exports = LoginReport;
