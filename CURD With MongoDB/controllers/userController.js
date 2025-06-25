const Users = require("../models/Users");

async function getAllUsername(req, res) {
    const users = await Users.find({});
    const html = `
    <ul>
      ${users.map(user => `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>`;
    res.send(html);
}

async function getAllUsers(req, res) {
    const users = await Users.find({});
    return res.status(200).json(users);
}

async function getUserById(req, res) {
    const user = await Users.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.status(200).json(user);
}

async function addUser(req, res) {
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
}

async function updateFullUser(req, res) {
    try {
        await Users.replaceOne({ _id: req.params.id }, req.body);
        const user = await Users.findById(req.params.id);
        if (!user) return res.status(404).json({ error: "user not found" })
        res.status(200).json({ status: "replaced", user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function updatePartOfUser(req, res) {
    const user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.status(200).json({ status: "patched", user });
}

async function deleteUserById(req, res) {
    const user = await Users.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" })
    return res.status(203).json({ status: "deleted" });
}

module.exports = {
    getAllUsername,
    getAllUsers,
    getUserById,
    addUser,
    updateFullUser,
    updatePartOfUser,
    deleteUserById
}