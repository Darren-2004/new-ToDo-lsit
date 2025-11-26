import express from 'express';  // Import Express
import cors from 'cors';        // Import CORS
import jwt from 'jsonwebtoken';  // Import JWT
import axios from 'axios';      // Import Axios to make API requests
import fs from 'fs';            // Import File System
import path from 'path';        // Import Path

const app = express();
app.use(cors());                // Enable CORS
app.use(express.json());        // Parse JSON bodies

// Load users from users.json file
const usersFilePath = './users.json';
let users = [];

// Initialize users file with default user if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
    users = [{ username: 'user1', password: 'password1' }];
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
} else {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf8');
        users = JSON.parse(data);
        if (!Array.isArray(users)) users = [];
    } catch (err) {
        console.error('Error reading users file:', err);
        users = [{ username: 'user1', password: 'password1' }];
    }
}

// Function to save users to file
const saveUsers = () => {
    try {
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    } catch (err) {
        console.error('Error saving users file:', err);
    }
};

// Route for user authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const token = jwt.sign({ username: user.username }, 'secret_key');
        return res.json({ token });
    }
    res.status(401).send('Invalid credentials');
});

// Route for user registration
app.post('/register', (req, res) => {
    const { username, password, confirmPassword } = req.body;

    // Validate input
    if (!username || !password || !confirmPassword) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    if (users.find(u => u.username === username)) {
        return res.status(409).json({ error: 'Username already exists' });
    }

    // Add new user
    users.push({ username, password });
    saveUsers();

    const token = jwt.sign({ username }, 'secret_key');
    return res.status(201).json({ token, message: 'Registration successful' });
});

// Route for getting product data
app.get('/products', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Get the token from the header

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, 'secret_key', async (err) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        try {
            const response = await axios.get('https://simple-fastapi-crud-app.onrender.com/products');
            res.json(response.data); // Send the product data from the API
        } catch (apiError) {
            console.error(apiError);
            res.status(500).send('Failed to fetch products from API.');
        }
    });
});

// Route for protected data
app.get('/protected', (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    jwt.verify(token, 'secret_key', (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        res.json({ message: 'Access granted to protected data', user });
    });
});

// Start the server
app.listen(4000, () => {
    console.log('Server running on http://localhost:4000');
});