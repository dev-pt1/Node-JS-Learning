const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Route with query
app.get('/search', (req, res) => {
    res.send(`Query: ${req.query.q}`)
});

// Route with param
app.get('/user/:id', (req, res) => {
    res.send(`User ID: ${req.params.id}`);
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
