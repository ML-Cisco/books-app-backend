import pool from "../../db/mysql.js";

const createBook = async (book, userId) => {
    const { name, title, author, rating } = book;
    const query = `INSERT INTO books (name, title, author, rating, user_id) VALUES (?, ?, ?, ?, ?)`
    const values = [name, title, author, rating, userId]
    const [result] =await pool.execute(query, values)
    return {
        id: result.insertId,
        ...book,
        user_id: userId,
    }
}

const getAllBooks = async (userId) => {
    const [rows] = await pool.execute("SELECT * FROM books WHERE user_id = ?", [userId])
    return rows
}

const getBookById = async (id, userId) => {
    const [rows] = await pool.execute("SELECT * FROM books WHERE id = ? AND user_id = ?",
        [Number(id), userId])
    return rows[0] || null
}

const updateBook = async (id, userId, book) => {
    const { name, title, author, rating } = book
    const query = `UPDATE books SET name = ?, title = ?, author = ?, rating = ? WHERE id = ? AND user_id = ?`
    const values = [name, title, author, rating, Number(id), userId]
    const [result] =await pool.query(query, values)
    return result.affectedRows > 0
}

const deleteBook = async (id, userId) => {
    const [result] = await pool.execute("DELETE FROM books WHERE id = ? AND user_id = ?",
        [Number(id)], userId)
    return result.affectedRows > 0
}

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook }