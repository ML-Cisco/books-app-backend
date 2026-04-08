import pool from "../../db/mysql.js";

const createUser = async (user) => {
    const {
        first_name,
        last_name,
        country,
        phone,
        birth_date,
        username,
        email,
        password_hash
    } = user
    const query = `INSERT INTO users 
    (first_name, last_name, country, phone, birth_date, username, email, password_hash)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const values = [
        first_name,
        last_name,
        country,
        phone,
        birth_date,
        username,
        email,
        password_hash
    ]
    const [result] = await pool.execute(query, values)
    return {
        id: result.insertId,
        ...user,
        is_verified: false,
    }
}

const findUserByEmailOrUsername = async (identifier) => {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ? OR username = ?`, [identifier, identifier])
    return rows[0] || null
}

const findUserById = async (id) => {
    const [rows] = await pool.execute(`SELECT * FROM users WHERE id = ?`, [id])
    return rows[0] || null
}

const markUserVerified = async (userId) => {
    await pool.execute(`UPDATE users SET is_verified = TRUE WHERE id = ?`, [userId])
}

export default { createUser, findUserByEmailOrUsername, findUserById, markUserVerified }
