import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import expenseRoutes from "./routes/expenseRoute.js";
const app = express();
import path from "path";

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

if (process.env.NODE_ENV.trim() === "production") {
  const frontendPath = path.join(process.cwd(), "frontend", "dist");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.use("/api/user", userRoutes);
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("server is running on port 5000");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
