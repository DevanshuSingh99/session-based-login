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

    // @ts-ignore
    const { userId } = decoded;

    const sessionData = await getClient().hget("user_sessions", userId);
    if (!sessionData) {
      return res.errorResponse(401, "Please login again");
      // Can also create a fallback to mongo session schema if redis data is not persisted
    }

    const parsedSessionData = JSON.parse(sessionData);

    // Comparing current session data with request data
    if (
      parsedSessionData?.token !== authToken ||
      parsedSessionData?.session?.user_agent !== req.headers["user-agent"] ||
      parsedSessionData?.session?.ip_address !== req.ip ||
      parsedSessionData?.session?.user_id !== userId
    ) {
      return res.errorResponse(401, "There is already a session up and running, please login again");
    }

    req.user = decoded;

    return next();
  } catch (error) {
    return res.errorResponse(401, "Unauthorized");
  }
};
