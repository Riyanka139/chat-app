import express from "express";
import chatController from "../controller/chat.controller.js";

const router = express.Router();

router.post("/", chatController.createChat);
router.get("/:id", chatController.findUserChats);
router.get("/:firstId/:secondId", chatController.findChat);

export default router;