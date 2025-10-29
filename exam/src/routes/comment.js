import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import commentController from "../controllers/commentController.js";

export const commentRouter = express.Router();

commentRouter.delete("/:id", isAuthenticated, commentController.deleteComment);
