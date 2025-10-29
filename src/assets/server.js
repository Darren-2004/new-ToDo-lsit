const express = require('express');
const fs = require('fs');
const app = express();
const port = 3001;

app.use(express.json());

// Get tasks
app.get('/tasks', (req, res) => {
    fs.readFile('./tasks.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading file');
        }
        res.send(JSON.parse(data));
    });
});

// Save tasks
app.post('/tasks', (req, res) => {
    fs.writeFile('./tasks.json', JSON.stringify(req.body), 'utf8', (err) => {
        if (err) {
            return res.status(500).send('Error writing file');
        }
        res.sendStatus(200);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});