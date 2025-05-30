// user display on the dashboard server6

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: '',   // Change with your actual username
    password: '',   // Change with your actual password
    database: 'my_database'
});

db.connect(err => {
    if (err) {
        console.error(" Database connection failed:", err.message);
    } else {
        console.log(" Connected to MySQL Database");
    }
});

app.get('/api/users', (req, res) => {
    db.query('SELECT * FROM users', (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.json(results);
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
