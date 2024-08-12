const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const sessionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: CONSTANTS.SCHEMA_NAMES.USER,
      required: true,
    },
    session_key: String,
    user_agent: String,
    ip_address: String,
  },
  { timestamps: true }
);

const Session = mongoose.model(CONSTANTS.SCHEMA_NAMES.SESSION, sessionSchema);

module.exports = Session;
