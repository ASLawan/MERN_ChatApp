import express from "express";
import authRouter from "./controllers/authControllers.js";

export const app = express();

app.use(express.json());

app.use("/api/auth/", authRouter);
