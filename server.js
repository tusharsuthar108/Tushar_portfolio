const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.use(bodyParser.json()); // For JSON data

// Connect to the MySQL database
const db = mysql.createConnection({
    host: 'localhost',        // Your MySQL server host
    user: 'root',             // Your MySQL username
    password: '7845',         // Your MySQL password
    database: 'webmsg',       // The database you created
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to the database!');
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    const query = 'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)';
    db.query(query, [name, email, message], (err, result) => {
        if (err) {
            console.error('Error occurred:', err);
            return res.status(500).json({ error: 'Failed to save form data' });
        }
        res.status(200).json({ message: 'Form data saved successfully!' });
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
