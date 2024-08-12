const logger = require("../utils/logger");
const LoginReport = require("../model/LoginReports");
const { getClient } = require("../config/database/redis");
const jwt = require("jsonwebtoken");

const commonService = {
  createLoginReport: async ({ userId, sessionId }) => {
    try {
      const newLoginReport = new LoginReport({
        user_id: userId,
        session_id: sessionId,
      });
      await newLoginReport.save();
    } catch (error) {
      logger(`Error in createLoginReport: ${error}`);
    }
  },
  createAndStoreToken: async ({ userId, session }) => {
    // create a jwt token and store in redis hashmap userId:token
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
    await getClient().hset("user_sessions", userId, JSON.stringify({ token, session }));
    return token;
  },
};

module.exports = commonService;
