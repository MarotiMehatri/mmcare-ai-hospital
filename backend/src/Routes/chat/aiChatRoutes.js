import express from "express";
import { handleAIChat } from "../../controllers/chat/aiChatController.js";

const router = express.Router();

router.post("/message", handleAIChat);

export default router;
