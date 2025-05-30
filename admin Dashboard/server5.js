//Order History server5.js

// In your server.js or a route file (like orders.js)
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: '',  // Change with your actual username
  password: '',// Change with your actual password
  database: 'orders_db'
});

// Fetch all orders endpoint
const fs = require('fs');

app.get('/api/orders', (req, res) => {
    db.query('SELECT * FROM orders', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            // Save orders to a JSON file
            fs.writeFileSync('orders.json', JSON.stringify(results, null, 2));
            res.json(results);
        }
    });
});


// Start the server
app.listen(3000, () => {
  console.log(`Server running on port http://localhost:3000`);
});
