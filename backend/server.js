import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connectDb.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"; // Import the router
import postRoutes from "./routes/postRoutes.js"

dotenv.config();

connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());

// Use the router for the "/api/users" route
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(5000, () => {
    console.log(`Server started on port 5000`);
});
