import express from "express";
import userController from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
export const userRouter = express.Router();

userRouter.post("/signup", userController.signup);
userRouter.post("/login", userController.login);
userRouter.get("/user", isAuthenticated, userController.getUser);
userRouter.patch("/username", isAuthenticated, userController.changeUsername);
