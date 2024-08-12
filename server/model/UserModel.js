const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const userSchema = new mongoose.Schema(
  {
    mobile: Number,
    user_name: String,
    active_session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CONSTANTS.SCHEMA_NAMES.SESSION,
    },
    sessions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: CONSTANTS.SCHEMA_NAMES.SESSION,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model(CONSTANTS.SCHEMA_NAMES.USER, userSchema);

module.exports = User;
