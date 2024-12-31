import express from "express";
import { Chat } from "../models/chatModel.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/new-chat", authenticate, async (req, res) => {
  try {
    const chat = new Chat(req.body);
    const savedChat = await chat.save();

    res.status(201).send({
      message: "Chat created successfully",
      success: true,
      data: savedChat,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
