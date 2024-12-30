import express from "express";
import authRouter from "./controllers/authControllers.js";
import userRouter from "./controllers/userControllers.js";

export const app = express();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
