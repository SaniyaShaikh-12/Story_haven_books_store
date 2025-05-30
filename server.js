require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: '',       //change with your actual username
    password: '',   //change with your actual password
    database: 'my_database'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.message);
        return;
    }
    console.log('Connected to the MySQL database');
});


const SECRET_KEY = 'your_secret_key'; // Change this to a secure key

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html'); // directory name 
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { username, email } = req.body;
    console.log("1");
    // Insert the form data into the MySQL database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
const defaultPassword = bcrypt.hashSync('default_password', 10);

db.query(sql, [username, email, defaultPassword], (err, result) => {
        if (err) {
            console.log("2");
            console.error('Error saving data:', err);
            return res.status(500).json({ status: 'error', message: 'Invalid username or passsword' });
        }
        console.log("3");
        res.json({ status: 'success', message: 'Logged in successfully' });
    });
});



// User Registration
app.post('/register', (req, res) => {
    const { username, email, mobile, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        
        db.query('INSERT INTO users (username, email, mobile, password) VALUES (?, ?, ?, ?)', 
            [username, email, mobile, hashedPassword], (err, result) => {
                if (err) return res.status(500).json({ error: 'Database error' });
                res.json({ message: 'User registered successfully' });
            });
    });
});

// User Login
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (isMatch) {
                const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
                res.cookie('token', token, { httpOnly: true }).json({ message: 'Login successful', username: user.username });
            } else {
                res.status(400).json({ error: 'Invalid credentials' });
            }
        });
    });
});

app.post('/forgot-password', (req, res) => {
    console.log('Request Body:', req.body); // Debugging log

    const { email } = req.body;
    if (!email) {
        console.error('Error: Email is missing from request');
        return res.status(400).json({ error: 'Email is required' });
    }

    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetLink = `http://localhost:5500/reset-password/${resetToken}`;

    db.query('UPDATE users SET reset_token = ? WHERE LOWER(email) = LOWER(?)', [resetToken, email], (err, result) => { 
        if (err) {
            console.error('Database Error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        if (result.affectedRows === 0) {
            console.warn('User not found:', email);
            return res.status(400).json({ error: 'User not found' });
        }

        console.log('Reset token updated:', resetToken); // Debugging log

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: { user: 'youremail@gmail.com', pass: '' }
        });

        const mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Password Reset',
            text: `Click the link to reset your password: ${resetLink}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Email sending error:', error);
                return res.status(500).json({ error: 'Email sending failed' });
            }
            console.log('Reset link sent:', resetLink);
            res.json({ message: 'Password reset link sent to your email' });
        });
    });
});


// Reset Password
app.post('/reset-password/:token', (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;
    
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: 'Server error' });
        
        db.query('UPDATE users SET password = ?, reset_token = NULL WHERE reset_token = ?', [hashedPassword, token], (err, result) => {
            if (err) return res.status(500).json({ error: 'Database error' });
            if (result.affectedRows === 0) return res.status(400).json({ error: 'Invalid or expired token' });
            
            res.json({ message: 'Password reset successfully' });
        });
    });
});

// User Profile - Fetch User Details
app.get('/profile', (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
    
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid token' });
        
        db.query('SELECT username FROM users WHERE id = ?', [decoded.id], (err, results) => {
            if (err) return res.status(500).json({ error: 'Server error' });
            res.json({ username: results[0].username });
        });
    });
});

// Server Listening
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:5500`);
});