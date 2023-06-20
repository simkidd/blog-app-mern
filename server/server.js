import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDb from "./db";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import postRoutes from "./routes/postRoutes";
import commentRoutes from "./routes/commentRoutes";
import { notFound, errorHandler } from "./middlewares/errorHandler";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// custom routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api", postRoutes);
app.use("/api", commentRoutes);

// Serve uploaded images as static assets
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// error handling middleware
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.json("backend server running...");
});

// server function
const startServer = async () => {
  try {
    await connectDb();
    app.listen(process.env.PORT, () => {
      console.log(`server listening at ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

startServer();
