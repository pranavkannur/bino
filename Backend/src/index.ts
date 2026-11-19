import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./lib/db";
import { env } from "./lib/env";
import authRoutes from "./routes/auth.routes";
import cookieParser from "cookie-parser";




const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
    res.json({ ok: true })
});

// routs
app.use("/api/auth", authRoutes);

//db connect
await connectDB();

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});
export default app;