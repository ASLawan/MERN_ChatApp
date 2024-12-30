import express from "express";
import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).send({
      message: "All fields are required",
      success: false,
    });
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPwd = await bcrypt.hash(password, 10);
    // password = hashedPwd

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPwd,
    });

    await newUser.save();

    res.status(201).send({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
