
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.config";
import validate from "./middleware/validate";
import cors from 'cors';
import { globalLimiter } from "./middleware/GlobalLimiter";
import { globalError } from "./errors/global.error";
// routes import 
import userRoutes from "./routes/user.routes";
import contentRoutes from "./routes/content.routes";
import linkRoutes from "./routes/link.routes";

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json());
app.use(globalLimiter);

app.use("/api/v1", userRoutes);
app.use("/api/v1/content", contentRoutes);
app.use("/api/v1/brain", linkRoutes);



// Global error handler
app.use(globalError);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
