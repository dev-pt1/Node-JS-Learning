const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let users = [
    { id: 1, name: 'Dev' },
    { id: 2, name: 'Vaghasiya' }
];

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.get('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

app.post('/users', (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });

    const newUser = { id: Date.now(), name };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name } = req.body;
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });
    if (!name) return res.status(400).json({ message: 'Name is required' });

    users[index] = { id, name };
    res.json(users[index]);
});

app.patch('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const { name } = req.body;
    if (name) user.name = name;

    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return res.status(404).json({ message: 'User not found' });

    const [deletedUser] = users.splice(index, 1);
    res.json(deletedUser);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
