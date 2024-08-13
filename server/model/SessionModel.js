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

// Index user_id and user_agent
sessionSchema.index({ user_id: 1, user_agent: 1 });

const Session = mongoose.model(CONSTANTS.SCHEMA_NAMES.SESSION, sessionSchema);

module.exports = Session;
