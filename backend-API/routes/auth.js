import express from "express";
import controller from "../controllers/authController.js";
import { tokenCheck } from "../middlewares/index.js";

const router = express.Router();
router.post("/signup", controller.signup);
router.post("/login", controller.login);
router.get("/user", tokenCheck, controller.user);
export default router;
