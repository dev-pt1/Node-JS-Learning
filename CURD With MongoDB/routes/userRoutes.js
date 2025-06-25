const express = require("express");

const { deleteUserById,
    updatePartOfUser,
    updateFullUser,
    addUser,
    getUserById,
    getAllUsers,
    getAllUsername
} = require("../controllers/userController");

const router = express.Router();

router.get("/users", getAllUsername);

router.get("/api/users", getAllUsers);

router.get("/api/user/:id", getUserById);

router.post("/api/addUser", addUser);

router.put("/api/updateFullUser/:id", updateFullUser);

router.patch("/api/updatePartOfUser/:id", updatePartOfUser);

router.delete("/api/deleteUser/:id", deleteUserById);

module.exports = router;