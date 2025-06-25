const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/connected-to-mongodb')
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(error));

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: String,
    email: { type: String, required: true, unique: true },
    gender: String,
    job_title: String,
});

const Users = mongoose.model("users", UserSchema);

app.get("/users", async (req, res) => {
    const users = await Users.find({});
    const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
});

app.get("/api/users", async (req, res) => {
    const users = await Users.find({});
    return res.status(200).json(users);
});

app.get("/api/user/:id", async (req, res) => {
    const user = await Users.findById(req.params.id);
    return res.status(200).json(user);
});

app.post("/api/addUser", async (req, res) => {
    const body = req.body;
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    try {
        const newUser = new Users(body);
        await newUser.save();
        return res.status(201).json({ status: "success", user: newUser });
    } catch (error) {
        return res.status(500).json({ msg: "Error saving user", error: error.message });
    }
});

app.put("/api/updateFullUser/:id", async (req, res) => {
    try {
        await Users.replaceOne({ _id: req.params.id }, req.body);
        const user = await Users.findById(req.params.id);
        res.status(200).json({ status: "replaced", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


app.patch("/api/updatePartOfUser/:id", async (req, res) => {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.status(200).json({ status: "patched", user });
});

app.delete("/api/deleteUser/:id", async (req, res) => {
    await Users.findByIdAndDelete(req.params.id);
    return res.status(203).json({ status: "deleted" });
});

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
