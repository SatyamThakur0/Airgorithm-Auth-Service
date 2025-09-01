import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.route.js";
import { PORT } from "./config/env.config.js";
import cors from "cors";
import nodeCron from "node-cron";

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: [
            `${process.env.FRONTEND_URL}`,
            `${process.env.ADMIN_PANEL_URL}`,
        ],
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
// nodeCron.schedule("*/5 * * * * *", async () => {
//     let res = await fetch(`${process.env.SELF}`);
//     res = await res.json();
//     console.log(res.message, " : ", new Date().getSeconds());
// });
