import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import errorMiddleware from "./middleware/error.middleware.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import imageRoutes from "./routes/image.routes.js";
import reactionRoutes from "./routes/reaction.routes.js";


dotenv.config({});

const app = express();

const port = process.env.PORT || 3000;
const frontend = process.env.FRONTEND_URL;

//! used to connect with frontend (react)
const corsOptions = {
    origin: frontend, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}
app.use(cors(corsOptions));

//! Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/images", imageRoutes);
app.use("/api/images", reactionRoutes);

// error handler
app.use(errorMiddleware);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
