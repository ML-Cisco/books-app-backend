const validateCreateBook = (book) => {
    const { name, title, author, rating } = book
    if (!name || !title || !author ) {
        return "name, title, author are required"
    }
    if (rating !== undefined) {
        const num = Number(rating)
        if (isNaN(num) || num < 0 || num > 5) {
            return "rating must be a number between 0 and 5"
        }
    }

    return null
}

const validateUpdateBook = (data) => {
    const { name, title, author, rating } = data
    if (!name || !title || !author) {
        return "name, title and author are required"
    }
    if (rating !== undefined) {
        const num = Number(rating);
        if (isNaN(num) || num < 0 || num > 5) {
            return "rating must be between 0 and 5"
        }
    }
    return null
}

export default { validateCreateBook, validateUpdateBook }