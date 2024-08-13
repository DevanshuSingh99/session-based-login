const User = require("../model/UserModel");
const Session = require("../model/SessionModel");
const helperFunctions = require("../utils/helperFunctions");
const {
  createLoginReport,
  createAndStoreToken,
} = require("../service/commonService");

const userController = {
  createUser: async (req, res) => {
    try {
      const { mobile, user_name } = req.body;

      const existingUser = await User.findOne({ mobile });

      if (existingUser) {
        return res.errorResponse(400, "User already exists. Please login.");
      }

      // Creating new user
      const newUser = new User({ mobile, user_name });

      // Creating new session for new user
      const newSession = new Session({ user_id: newUser._id });

      // Creating new session data
      newSession.user_agent = req.headers["user-agent"]; // Capture user agent from request
      newSession.ip_address = req.ip; // Capture IP address from request
      newSession.session_key = helperFunctions.generateRandonCode(16);

      // Storing session data in user
      newUser.active_session = newSession._id;
      newUser.sessions.push(newSession._id);

      await Promise.all([
        newUser.save(),
        newSession.save(),
        createLoginReport({ userId: newUser._id, sessionId: newSession._id }),
      ]);

      const token = await createAndStoreToken({
        userId: newUser._id,
        session: newSession,
      });

      res.apiResponse(200, { token });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
  login: async (req, res) => {
    try {
      const { mobile, user_name } = req.body;

      let user = await User.findOne({ mobile });

      if (!user)
        return res.errorResponse(400, "User not found. Please signup.");

      // using user_name as password
      if (user.user_name !== user_name)
        return res.errorResponse(400, "User name does not match");

      const userAgent = req.headers["user-agent"];
      let userSession = await Session.findOne({
        user_id: user._id,
        user_agent: userAgent,
      });

      if (!userSession) {
        userSession = new Session({
          user_id: user._id,
          user_agent: userAgent,
          ip_address: req.ip,
          session_key: helperFunctions.generateRandonCode(16),
        });
        user.active_session = userSession._id;
        user.sessions.push(userSession._id);
      } else {
        user.active_session = userSession._id;
        userSession.ip_address = req.ip;
      }

      const [token] = await Promise.all([
        createAndStoreToken({ userId: user._id, session: userSession }),
        createLoginReport({ userId: user._id, sessionId: userSession._id }),
        user.save(),
        userSession.save(),
      ]);

      res.apiResponse(200, { token });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
  getUser: async (req, res) => {
    try {
      const { userId } = req.user;
      const data = await User.findById(userId)
        .populate("active_session sessions")
        .lean();
      res.apiResponse(200, { user: data });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
};

module.exports = userController;
