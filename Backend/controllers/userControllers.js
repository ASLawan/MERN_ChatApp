import express from "express";
import { User } from "../models/userModel.js";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get user

router.get("/get-user", authenticate, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });

    console.log(user);

    return res.status(200).send({
      message: "User was found!",
      success: true,
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

// Get users
router.get("/get-users", authenticate, async (req, res) => {
  try {
    const loggedInUser = req.body.userId;
    const users = await User.find({ _id: { $ne: loggedInUser } });

    return res.status(200).send({
      message: "Found Users",
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

export default router;
