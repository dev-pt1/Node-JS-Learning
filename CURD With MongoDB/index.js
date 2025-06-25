const express = require("express");
const { connectDB } = require("./connection")
const userRoutes = require("./routes/userRoutes")

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB("mongodb://localhost:27017/connected-to-mongodb")
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(error));

app.use("/", userRoutes);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));