const express = require("express");
const userRouter = express.Router();
const adminValidator = require("../validators/adminValidator");
const adminController = require("../controller/adminController");
const adminAuthMiddleware = require("../middleware/adminAuthMiddleware");

userRouter.post("/login", adminValidator.login, adminController.login);

userRouter.use(adminAuthMiddleware);
userRouter.get(
  "/get-user-details",
  adminValidator.getUserDetails,
  adminController.getUserDetails
);

userRouter.get(
  "/get-users-login-report",
  adminValidator.getUserDetails,
  adminController.getUsersLoginReport
);

userRouter.put(
  "/invalidate-user-session",
  adminValidator.getUserDetails,
  adminController.invalidateUserSession
);

module.exports = userRouter;
