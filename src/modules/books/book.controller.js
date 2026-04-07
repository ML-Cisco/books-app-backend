import bookService from "./book.service.js";
import {ApiError} from "../../utils/ApiError.js";
import {asyncHandler} from "../../middlewares/asyncHandler.js";

const createBook = asyncHandler(async (req, res) => {
    const book = await bookService.createBook(req.body)
    res.status(201).json({success: true, data: book})
})

const getAllBooks = asyncHandler(async (req, res) => {
    const data = await bookService.getAllBooks()
    res.status(200).json({ success: true, data: data })
})

const getBookById = asyncHandler(async (req, res) => {
    const data = await bookService.getBookById(req.params.id)
    if (!data) {
        throw new ApiError(404, 'Book not found')
    }
    res.status(200).json({ success: false, data: data })
})

const updateBook = asyncHandler(async (req, res) => {
    const updatedBook = await bookService.updateBook(req.params.id, req.body)
    if (!updatedBook) {
        throw new ApiError(404, 'Book not found')
    }
    res.status(200).json({ success: true, data: updatedBook })
})

const deleteBook = asyncHandler(async (req, res) => {
    const deletedBook = await bookService.deleteBook(req.params.id)
    if (!deletedBook) {
        throw new ApiError(404, 'Book not found')
    }
    res.status(200).json({ success: false, message: 'Book deleted' })
})

export default { createBook, getAllBooks, getBookById, updateBook, deleteBook }