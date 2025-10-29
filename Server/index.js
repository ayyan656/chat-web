import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
// Connect to MongoDB
connectDB();

app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome back!</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
