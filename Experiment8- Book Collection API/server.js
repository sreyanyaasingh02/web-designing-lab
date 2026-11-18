
const express = require('express');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Sample book collection
let books = [
    { id: 1, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
    { id: 2, title: "The Alchemist", author: "Paulo Coelho" }
];

// Home route
app.get('/', (req, res) => {
    res.send("Welcome to Book Collection API!");
});

// 1. GET - Retrieve all books
app.get('/books', (req, res) => {
    res.json(books);
});

// 2. GET - Retrieve a book by ID
app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
});

// 3. POST - Add a new book
app.post('/books', (req, res) => {
    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    const newBook = {
        id: books.length ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});

// 4. PUT - Update a book
app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === Number(req.params.id));

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    const { title, author } = req.body;

    if (!title || !author) {
        return res.status(400).json({
            message: "Title and author are required"
        });
    }

    book.title = title;
    book.author = author;

    res.json({
        message: "Book updated successfully",
        book
    });
});

// 5. DELETE - Remove a book
app.delete('/books/:id', (req, res) => {
    const index = books.findIndex(b => b.id === Number(req.params.id));

    if (index === -1) {
        return res.status(404).json({ message: "Book not found" });
    }

    const deletedBook = books.splice(index, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
