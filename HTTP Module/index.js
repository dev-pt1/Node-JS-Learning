const http = require("http")
const fs = require("fs")
const url = require("url")

const myserver = http.createServer((req, res) => {
    const log = `${Date.now()} : ${req.url} : New Request Received \n`
    const myUrl = url.parse(req.url, true)
    console.log("🚀 ~ myserver ~ myUrl:", myUrl)
    if (req.url === "/favicon.ico") return res.end();
    fs.appendFile("./log.txt", log, (err, data) => {
        switch (myUrl.pathname) {
            case ("/"): res.end("HomePage")
                break;
            case ("/about"):
                const name = myUrl.query.name;
                res.end(`Hi, ${name}! Welcome to About Page`)
                break;
            // case ("/search"):
            //     const search = myUrl.query.search_query;
            //     res.end(`here are your search results for ${search}`)
            //     break;
            case "/signup":
                if (req.method === "GET")
                    res.end("This is a signU form")
                else if (req.method === "POST") {
                    // DB query
                    res.end("data added successfully")
                }
            default: res.end("404 Not Found")
        }
    })
    // console.log(req);
    // res.end("hello from server")
})

myserver.listen(8000, () => console.log("server started at http://localhost:8000"))