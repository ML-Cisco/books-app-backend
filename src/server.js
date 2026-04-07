import app from "./app.js"
import env from "./config/env.js";
import pool from "./db/mysql.js";


const startServer = async () => {
    try {
        const connection = await pool.getConnection()
        console.log("Database connected successfully.")
        connection.release()

        const server = app.listen(env.port, () => {
            console.log(`Server started on port: ${env.port}`)
        })

        process.on("SIGTERM",() => {
            console.log("SIGTERM received. Shutting down")
            server.close(() => {
                console.log("Process terminated")
            })
        })
    } catch (error) {
        console.error(`Failed to connect to db: ${error}`)
        process.exit(1)
    }
}

startServer()