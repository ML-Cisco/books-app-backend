import pool from "../../db/mysql.js";

const createBook = async (book) => {
    const { name, title, author, rating } = book;
    const query = `INSERT INTO books (name, title, author, rating) VALUES (?, ?, ?, ?)`
    const values = [name, title, author, rating]
    const [result] =await pool.query(query, values)
    return {
        id: result.insertId,
        ...book
    }
}

const getAllBooks = async () => {
    const [rows] = await pool.query("SELECT * FROM books")
    return rows
}

const getBookById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM books WHERE id = ?",[Number(id)])
    return rows[0] || null
}

const updateBook = async (id, book) => {
    const { name, title, author, rating } = book
    const query = `UPDATE books SET name = ?, title = ?, author = ?, rating = ? WHERE id = ?`
    const values = [name, title, author, rating, Number(id)]
    const [result] =await pool.query(query, values)
    return result.affectedRows > 0
}

const deleteBook = async (id) => {
    const [result] = await pool.execute("DELETE FROM books WHERE id = ?",[Number(id)])
    return result.affectedRows > 0
}

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook }