import express from "express";
import postController from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/uploader.js";

export const postRouter = express.Router();

postRouter.post(
  "/",
  isAuthenticated,
  upload.single("imageURL"),
  postController.addPost
);

postRouter.post("/:id/comment", isAuthenticated, postController.addComment);

postRouter.get("/:id", isAuthenticated, postController.getPost);
