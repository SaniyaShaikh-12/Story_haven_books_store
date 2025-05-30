//add products from admin  server

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const path = require("path");
// ✅ Serve static files (images)
app.use("/img", express.static(path.join(__dirname, "img")));


// Serve static files (images) from the "img" folder
//app.use("/img", express.static(path.join(__dirname, "books webstie/img")));

// MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "",  // Change with your actual username
    password: "",  // Change with your password
    database: "my_database"  // Change to your actual database name
});

db.connect(err => {
    if (err) throw err;
    console.log("Connected to MySQL Database");
});

// API to Add Product
app.post("/api/add-product", (req, res) => {
    const { title, price, original_price, image_url, rating } = req.body;
    
    const query = "INSERT INTO products (title, price, original_price, image_url, rating) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [title, price, original_price, image_url, rating], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Product added successfully", id: result.insertId });
    });
});

// API to Get Products
app.get("/api/products", (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        console.log("Fetched products from DB:", results); // Debugging

        const updatedResults = results.map(product => ({
            ...product,
            image_url: `http://localhost:5000/img/${product.image_url}`}));

        console.log("Modified product list:", updatedResults); // Debugging

        res.json(updatedResults);
    });
});


app.delete("/api/delete-product/:id", (req, res) => {
    const { id } = req.params;

    const query = "DELETE FROM products WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ message: "Product deleted successfully" });
    });
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));