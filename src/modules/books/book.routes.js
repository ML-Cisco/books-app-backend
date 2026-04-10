import express from "express";
import bookController from "../books/book.controller.js";
import validator from "./book.validator.js";
import {ApiError} from "../../utils/ApiError.js";
import authenticate from "../../middlewares/auth.midleware.js";

const router = express.Router()

router.use(authenticate)

router.post("/", (req, res, next) => {
    const error = validator.validateCreateBook(req.body)
    if (error) {
        return  next(new ApiError(400, 'error'))
    }
    return bookController.createBook(req, res, next)
})

router.get("/", bookController.getAllBooks)

router.get("/:id", bookController.getBookById)

router.put("/:id", (req, res, next) => {
    const error = validator.validateUpdateBook(req.body)
    if (error) {
        return  next(new ApiError(400, 'error'))
    }
    return bookController.updateBook(req, res, next)
})

router.delete("/:id", bookController.deleteBook)

export default router