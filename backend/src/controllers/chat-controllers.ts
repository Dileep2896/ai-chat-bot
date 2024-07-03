import { Request, Response, NextFunction } from "express";
import User from "../models/User.js";
import { configureOpenAI } from "../config/openai-config.js";
import { OpenAI } from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { message } = req.body;

  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found OR Token Malfunctioned" });
    }
    // Grab chats of user
    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionMessageParam[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    // Send all chats with new one through OpenAI API
    const config = configureOpenAI();
    const openai = new OpenAI(config);

    console.log(chats);

    // Getting latest response
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: chats,
    });
    user.chats.push(chatResponse.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found OR Token Malfunctioned");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't matched");
    }

    return res
      .status(200)
      .json({ message: "User logged in", chats: user.chats });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // User token check
    const user = await User.findById(res.locals.jwtData.id);
    if (!user)
      return res.status(401).send("User not found OR Token Malfunctioned");

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).send("Permission didn't matched");
    }

    //@ts-ignore
    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "ERROR", cause: error.message });
  }
};
