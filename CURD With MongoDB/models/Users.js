const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true
        },
        last_name: {
            type: String
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        gender: {
            type: String,
        },
        job_title: {
            type: String
        },
    });

const Users = mongoose.model("users", UserSchema);

module.exports = Users;