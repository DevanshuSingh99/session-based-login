const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const adminSchema = new mongoose.Schema(
  {
    password: String,
    user_name: String,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(CONSTANTS.SCHEMA_NAMES.ADMIN, adminSchema);

module.exports = User;
