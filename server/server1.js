const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(5000, () => {
    console.log('Server running on http://localhost:5001');
});

// Database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: '',      //change with your actual username
    password: '',   //change with your actual password
    database: 'storyhaven'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("Database connection failed: " + err.message);
    } else {
        console.log("Connected to MySQL database.");
    }
});

// Admin Login Route
app.post("/admin/login", (req, res) => {
    const { username, password } = req.body;
    
    const query = "SELECT * FROM admins WHERE username = ? AND password = ?";
    
    db.execute(query, [username, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            res.json({ success: true, message: "Login successful" });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    });
});

// Get all books
app.get('/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Add a new book
app.post('/books', (req, res) => {
    const { title, author, price, image } = req.body;
    
    if (!title || !author || !price || !image) {
        return res.status(400).json({ error: "All fields are required" });
    }

    db.query(
        'INSERT INTO books (title, author, price, image) VALUES (?, ?, ?, ?)', 
        [title, author, price, image], 
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true, id: result.insertId, message: "Book added successfully" });
        }
    );
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    const { id } = req.params;
    
    db.query('DELETE FROM books WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Book not found" });
        }
        res.json({ success: true, message: "Book deleted successfully" });
    });
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:5001`);
});