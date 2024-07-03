import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();

// Initialize an Express application
const app = express();

// Middlewares

// By passing server diff
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Use the express.json() middleware to parse incoming JSON requests
app.use(express.json());

// Remove it in production.
app.use(morgan("dev"));

// Cookies
app.use(cookieParser(process.env.COOKIE_KEY));

// Routers
app.use("/api/v1", appRouter);

export default app;
