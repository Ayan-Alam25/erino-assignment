import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";

import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }

    const userAlreadyExist = await User.findOne({ email });

    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "User already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });

    await user.save();

    return res.status(201).json({
      success: true,
      error: false,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({
          success: false,
          error: true,
          message: "User with this email not found",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, error: true, message: "Invalid Password" });
    }

    const access_token = generateAccessToken(res, user);

    return res.status(200).json({
      success: true,
      message: "User login successfully",
      access_token,
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: true, message: error.message });
  }
};
