import express from "express";
import { Chat } from "../models/chatModel.js";
import { Message } from "../models/messageModel.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/new-msg", authenticate, async (req, res) => {
  try {
    const newMsg = new Message(req.body);
    const savedMsg = await newMsg.save();

    const currentChat = await Chat.findById(req.body.chatId);
    currentChat.lastmessage = savedMsg._id;
    currentChat.unreadMessageCount += 1;
    await currentChat.save();

    // ALTERNATIVE

    // const currentChat = await Chat.findByIdAndUpdate(
    //   { _id: req.body.chatId },
    //   {
    //     lastmessage: savedMsg._id,
    //     $inc: { unreadMessageCount: 1 },
    //   }
    // );

    res.status(201).send({
      message: "Text message successfully sent",
      success: true,
      data: savedMsg,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

router.get("/user-msgs/:chatId", authenticate, async (req, res) => {
  try {
    const allMsgs = await Message.find({ chatId: req.params.chatId }).sort({
      createdAt: 1,
    });

    res.status(200).send({
      message: "User messages found!",
      success: true,
      data: allMsgs,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
