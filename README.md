### Create a book

http://localhost:3000/api/books

{
    "name": "Clean Code",
    "title": "A Handbook of Agile Software Craftsmanship",
    "author": "Robert C. Martin",
    "rating": 4.5
}

# Get all books

http://localhost:3000/api/books/{id}


# Get a book by ID

http://localhost:3000/api/books/3

# Update a book

http://localhost:3000/api/books/{id}

{
    "name": "Clean Code",
    "title": "A Handbook of Agile Software Craftsmanship",
    "author": "Robert C. Martin",
    "rating": 4.5
}

# Delete a book
http://localhost:3000/api/books/{id}