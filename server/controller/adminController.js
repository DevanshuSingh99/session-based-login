const { getClient } = require("../config/database/redis");
const Admin = require("../model/AdminModel");
const LoginReport = require("../model/LoginReports");
const User = require("../model/UserModel");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (req, res) => {
    try {
      const { password, user_name } = req.body;

      let admin = await Admin.findOne({ user_name });

      if (!admin) return res.errorResponse(400, "Admin not found.");

      if (admin.password !== password)
        return res.errorResponse(400, "Password does not match");

      const token = jwt.sign({ user_name }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.apiResponse(200, { token });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
  getUserDetails: async (req, res) => {
    try {
      const { userId } = req.query;
      const data = await User.findById(userId)
        .populate("active_session sessions")
        .lean();
      res.apiResponse(200, { user: data });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
  getUsersLoginReport: async (req, res) => {
    try {
      const { userId } = req.query;
      const data = await LoginReport.find({ user_id: userId });
      res.apiResponse(200, { user: data });
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
  invalidateUserSession: async (req, res) => {
    try {
      const { userId } = req.query;

      await getClient().hdel("user_sessions", userId);

      res.apiResponse(200, "Session Invalidated");
    } catch (error) {
      res.errorResponse(500, error?.message, error?.stack);
    }
  },
};

module.exports = adminController;
