import { Request, Response, NextFunction } from "express";
import { hash, compare } from "bcrypt";
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Get all users
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // User signup
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(401).send("User already registered");
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });

    // Clearning cookies
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // Create a new token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Setting expire date for the cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Sending cookie to the browser
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    await user.save();
    return res
      .status(201)
      .json({ message: "User saved", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // User login
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("User not found");

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) return res.status(403).send("Incorrect password");

    // Clearning cookies
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    // Create a new token
    const token = createToken(user._id.toString(), user.email, "7d");

    // Setting expire date for the cookie
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    // Sending cookie to the browser
    res.cookie(COOKIE_NAME, token, {
      path: "/",
      domain: "localhost",
      expires,
      httpOnly: true,
      signed: true,
    });

    return res
      .status(200)
      .json({ message: "User logged in", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User login
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found OR Token Malfunctioned");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't matched");
    }

    return res
      .status(200)
      .json({ message: "User logged in", name: user.name, email: user.email });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const userLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User login
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found OR Token Malfunctioned");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't matched");
    }

    // Clearning cookies
    res.clearCookie(COOKIE_NAME, {
      domain: "localhost",
      httpOnly: true,
      signed: true,
      path: "/",
    });

    return res.status(200).json({ message: "User logged out" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
