const jwt = require("jsonwebtoken");
const { getClient } = require("../config/database/redis");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.errorResponse(401, "Unauthorized");
    }

    const authToken = authHeader.split(" ")[1];
    if (!authToken) return res.errorResponse(401, "Unauthorized");

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET);

    req.user = decoded;

    return next();
  } catch (error) {
    return res.errorResponse(401, "Unauthorized");
  }
};
