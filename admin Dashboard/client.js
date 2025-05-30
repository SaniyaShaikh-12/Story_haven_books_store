const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const users = {
    admin: { username: 'admin', password: 'password' } 
};

// Serve the admin dashboard after successful login
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'admin-dashboard.html')); 
});

// Handle login POST request
app.post('/submit', (req, res) => {
    const { username, password } = req.body;

    if (users[username]) {
        const hashedPassword = users[username].password;
        
        // Compare input password with the hashed password
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (result) {
                // If the password matches, redirect to admin dashboard
                res.redirect('/admin');
            } else {
                // If the password doesn't match, send an error message
                res.send('Invalid credentials. <a href="/">Try again</a>');
            }
        });
    } else {
        // If the user doesn't exist, send an error message
        res.send('User does not exist. <a href="/">Try again</a>');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:3000`);
});
