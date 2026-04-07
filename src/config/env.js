import dotenv from 'dotenv'

dotenv.config()

const env = {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'dev',
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}

export default env