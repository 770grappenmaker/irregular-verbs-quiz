const express = require("express");
const fs = require("fs");
const path = require("path")
const port = process.argv.slice(2)[0] || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "/public")))
app.get("/verbs", (req, res) => {
    if(!fs.existsSync("./verbs.json")) return res.status(404).send("Database was not found")
    let verbs = require("./verbs.json");
    if(verbs != null) res.status(200).send(verbs);
})

app.listen(port);
console.log(`Server now listening on port ${port}!`)