import { Router } from "express";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../utils/token-manager.js";
import { chatCompletionValidator, validate } from "../utils/validator.js";
import {
  deleteChats,
  generateChatCompletion,
  sendChatsToUser,
} from "../controllers/chat-controllers.js";

const chatRoutes = Router();

// Protected API
chatRoutes.post(
  "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
);

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser);

chatRoutes.delete("/delete", verifyToken, deleteChats);

export default chatRoutes;
