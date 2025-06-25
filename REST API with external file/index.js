const express = require("express");
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>`
    res.send(html);
})

app.get("/api/users", (req, res) => {
    return res.json(users)
})

app.get("/api/user/:id", (req, res) => {
    const id = Number(req.params.id)
    const user = users.find((user) => user.id === id)
    return res.json(user)
})

app.post("/api/addUser", (req, res) => {
    const user = req.body;
    const id = users.length + 1;
    users.push({ id, ...user })
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), (err, data) => {
        return res.json({ status: "success", id })
    })
})

// PUT - Replace a user completely
app.put("/api/updateFullUser/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ status: "error", message: "User not found" });

    users[index] = { id, ...req.body }; // Replace entire user
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
        return res.json({ status: "updated", user: users[index] });
    });
});

// PATCH - Update part of a user
app.patch("/api/updatePartOfUser/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ status: "error", message: "User not found" });

    users[index] = { ...users[index], ...req.body }; // Merge changes
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
        return res.json({ status: "patched", user: users[index] });
    });
});

// DELETE - Remove a user
app.delete("/api/deleteUser/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ status: "error", message: "User not found" });

    const deletedUser = users.splice(index, 1)[0];
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users, null, 2), err => {
        return res.json({ status: "deleted", user: deletedUser });
    });
});

app.listen(PORT, () => console.log(`server started at http://localhost:${PORT}`))