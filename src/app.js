import express from 'express'
import cors from 'cors'
import pool from "./db/mysql.js"
import bookRoutes from "./modules/books/book.routes.js"
import authRoutes from "./modules/auth/auth.routes.js"
import {errorMiddleware} from "./middlewares/error.middleware.js"

const app = express()

app.use(express.json())

/* CORS config */
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

/* health check route */
app.get("/health", (req, res) => {
    res.status(200).json({
        status: 'ok',
        uptime: process.uptime(),
        timestamp: Date.now(),
    })
})

/* db test route */
app.get("/db-test", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1 + 1 AS result")
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

/* auth route */
app.use("/api/auth", authRoutes)

/* book routes */
app.use("/api/books", bookRoutes)

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

/* global error handler */
app.use(errorMiddleware);

export default app