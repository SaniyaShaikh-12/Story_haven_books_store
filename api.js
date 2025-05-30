const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Create Express app
const app = express();
app.use(bodyParser.json());

// Create a connection to the database
const db = mysql.createConnection({
    host: 'localhost',
    user: '',             //change with your actual username
    password: '',          //change with your actual password
    database: 'my_database'
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// Place Order
app.post('/api/orders', (req, res) => {
    const { user_id, payment_method, total_amount } = req.body;

    const query = 'INSERT INTO orders (user_id, payment_method, total_amount) VALUES (?, ?, ?)';
    db.query(query, [user_id, payment_method, total_amount], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error placing order', details: err });
        }
        res.status(201).json({ orderId: result.insertId, message: 'Order placed successfully' });
    });
});

// Get Orders
app.get('/api/orders/:user_id', (req, res) => {
    const userId = req.params.user_id;

    const query = 'SELECT * FROM orders WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error retrieving orders', details: err });
        }
        res.status(200).json(results);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:5500`);
});

