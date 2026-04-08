import pool from "../../db/mysql.js";

const createOTP = async (userId, otp, expiresAt) => {
    const query = `INSERT INTO otps (user_id, otp_code, expires_at)
    VALUES (?, ?, ?)`
    await pool.execute(query, [userId, otp, expiresAt])
}

const findValidOTP = async (userId, otp) => {
    const query = `
        SELECT * FROM otps
        WHERE user_id = ?
          AND otp_code = ?
          AND is_used = FALSE
          AND expires_at > NOW()
        ORDER BY id DESC
        LIMIT 1`
    const [rows] = await pool.execute(query, [userId, otp])
    return rows[0] || null
}

const markOTPUsed = async (otpId) => {
    await pool.execute(`UPDATE otps SET is_used = TRUE WHERE id = ?`, [otpId])
}

export default { createOTP, findValidOTP, markOTPUsed }