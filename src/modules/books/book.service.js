import bookRepository from "./book.repository.js";

const createBook = async (bookData, userId) => {
    return await bookRepository.createBook(bookData, userId);
}

const getAllBooks = async (userId) => {
    return await bookRepository.getAllBooks(userId)
}

const getBookById = async (bookId, userId) => {
    return await bookRepository.getBookById(bookId, userId)
}

const updateBook = async (id, userId, bookData) => {
    return await bookRepository.updateBook(id, userId, bookData)
}

const deleteBook = async (bookId, userId) => {
    return await bookRepository.deleteBook(bookId, userId)
}

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook }