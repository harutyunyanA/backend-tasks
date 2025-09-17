import express from "express";
import controller from "../controllers/postController.js";
const router = express.Router();

router.get("", controller.addPostMainPage);

router.post("", controller.addNewPost);

export default router;
