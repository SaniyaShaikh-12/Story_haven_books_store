require("dotenv").config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const { sendReceiptEmail } = require("./emailservice");  // Import the email function

const app = express();
const path = require("path");
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5001;

app.use(express.static(path.join(__dirname, "./storyhaven1"))); // Change "public" to your actual folder

// ✅ MySQL Database Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "",                //change with your actual username
    password: "",            //change with your actual password
    database: "orders_db",
});

db.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL Database");
    }
});

// ✅ Place Order API
app.post("/place-order", (req, res) => {
    console.log("Received Order Request:", req.body);

    const { fullName, mobile, address, email, paymentMethod, paymentDetails, cart, total } = req.body;

    if (!fullName || !mobile || !address || !email || !paymentMethod || !cart.length || !total) {
        console.log("Missing required fields:", req.body);
        return res.status(400).json({ message: "Missing required fields" });
    }

    const orderQuery = "INSERT INTO orders (full_name, mobile, address, email, payment_method, payment_details, total) VALUES (?, ?, ?, ?, ?, ?, ?)";

    db.query(orderQuery, [fullName, mobile, address, email, paymentMethod, paymentDetails, total], (err, result) => {
        if (err) {
            console.error("Error inserting order:", err);
            return res.status(500).json({ message: "Database error" });
        }

        const orderId = result.insertId;

        let itemQueries = cart.map(item => {
            return new Promise((resolve, reject) => {
                const itemQuery = "INSERT INTO order_items (order_id, name, quantity, price) VALUES (?, ?, ?, ?)";
                db.query(itemQuery, [orderId, item.name, item.quantity, item.price], (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
        });

        Promise.all(itemQueries)
            .then(() => {
                console.log("Order placed successfully:", { orderId });

                // ✅ Call sendReceiptEmail function after the order is successfully inserted
                sendReceiptEmail(fullName, mobile, address, email, paymentMethod, paymentDetails, cart, total);

                res.json({ message: "Order placed successfully", orderId });
            })
            .catch((err) => {
                console.error("Error inserting order items:", err);
                res.status(500).json({ message: "Database error while inserting order items" });
            });
    });
});

// ✅ Fetch Order Details API
app.get("/order/:id", (req, res) => {
    const orderId = req.params.id;
    const query = "SELECT * FROM order_items WHERE order_id = ?";
    
    db.query(query, [orderId], (err, results) => {
        if (err) {
            console.error("Error fetching order items:", err);
            return res.status(500).json({ message: "Database error" });
        }
        res.json(results);
    });
});

// ✅ Start Server (Only Once)
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));