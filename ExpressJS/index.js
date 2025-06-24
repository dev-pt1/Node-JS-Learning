const http = require("http")
const express = require("express")

const app = express();

app.get("/", (req, res) => {
    return res.send("HomePage")
})

app.get("/about", (req, res) => {
    return res.send("Hello" + " " + req.query.name)
})

app.listen(8000, () => console.log("server started at http://localhost:8000"))

// const myserver = http.createServer(app)

// myserver.listen(8000, () => console.log("server started at http://localhost:8000"))