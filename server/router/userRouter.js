const express = require("express");
const userRouter = express.Router();
const userValidator = require("../validators/userValidator");
const userController = require("../controller/userController");
const userAuthMiddleware = require("../middleware/userAuthMiddleware");

userRouter.post("/create-user", userValidator.createUser, userController.createUser);
userRouter.post("/login", userValidator.login, userController.login);

userRouter.use(userAuthMiddleware);
userRouter.get("/get-user", userController.getUser);

module.exports = userRouter;
