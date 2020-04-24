const { Router } = require("express");
const UserController = require("./controller");
const middlewares = require("../../../middlewares");

const { UserValidator } = middlewares;

const validateReg = [UserValidator.registrationInputs];

const userRouter = Router();

userRouter.post("/register", ...validateReg, UserController.register);

userRouter.get("/verifyAccount", UserController.verifyEmail);

userRouter.post("/forgotPassword", UserController.forgotPassword);
userRouter.post("/resetPassword", UserController.resetPassword);

module.exports = userRouter;
