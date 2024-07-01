import "dotenv/config.js";
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser";

// Files
import authRoute from "./routers/auth-route.js"
import blogRoute from "./routers/blog-route.js"
import ConnectToDB from "./lib/db.js"

const app = express();

// Middlewares
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true // This is crucial to allow cookies to be sent/received
}));

app.use(express.json({ limit: '20mb' }));

app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);

const PORT = process.env.PORT || 3000;

ConnectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
});
