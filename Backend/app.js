import express from "express";
import authRouter from "./controllers/authControllers.js";
import userRouter from "./controllers/userControllers.js";
import chatRouter from "./controllers/chatControllers.js";
import msgRouter from "./controllers/msgControllers.js";

export const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/msg", msgRouter);
