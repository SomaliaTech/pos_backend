// api/index.js

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import serverless from "serverless-http";
import connectDB from "../config/databse.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import routerUser from "../routers/user.js";
import routerMenu from "../routers/menu.js";
import routerReport from "../routers/reports.js";
import routerOrder from "../routers/order.js";
import routerTable from "../routers/table.js";

const app = express();

// Connect to DB once at cold start
connectDB();

// Middlewares
app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_CLIENT, "http://localhost:3000"],
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// Routes
app.get("/test", (req, res) => {
  res.json({ message: "Hello from POS Server!" });
});

app.use("/api/user", routerUser);
app.use("/api/menus", routerMenu);
app.use("/api/reports", routerReport);
app.use("/api/orders", routerOrder);
app.use("/api/table", routerTable);

// Export for Vercel
export const handler = serverless(app);
