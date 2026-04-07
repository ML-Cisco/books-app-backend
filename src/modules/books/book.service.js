import bookRepository from "./book.repository.js";

const createBook = async (bookData) => {
    return await bookRepository.createBook(bookData);
}

const getAllBooks = async () => {
    return await bookRepository.getAllBooks()
}

const getBookById = async (bookId) => {
    return await bookRepository.getBookById(bookId)
}

const updateBook = async (id, bookData) => {
    return await bookRepository.updateBook(id, bookData)
}

const deleteBook = async (bookId) => {
    return await bookRepository.deleteBook(bookId)
}

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook }