import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import { PORT } from "./config/env.config.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [`${process.env.FRONTEND_URL}`,"http://localhost:5174"],
        credentials: true,
    })
);

app.get("/", (req, res) => {
    return res.json({ ok: true, message: "Auth service is running..." });
});

app.use("/auth", router);

app.listen(PORT, () => {
    console.log(`Auth Service is running on PORT : ${PORT}`);
});
