import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes"
import reportRoutes from './routes/reportRoutes'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000
const MONGO_URL = process.env.MONGO_URL || ""

// globle middlewares
app.use(cors());
app.use(express.json());

// mount routes
app.get("/", (req, res) => {
    res.send("Backend Running...");
});

app.use("/api/v1/auth",authRoutes)
app.use("/api/v1/reports", reportRoutes);

mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("reson : " , err.message);
        console.error("fail to DB connect");
    })

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});