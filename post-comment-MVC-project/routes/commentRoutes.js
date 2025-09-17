import express from "express";
import controller from "../controllers/commentController.js";

const router = express.Router();

router.get("/:id", controller.commentsPage);
router.post("/:id", controller.postComments)

export default router;
