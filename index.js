const express = require("express");
const fs = require("fs");
const path = require("path")
const port = process.argv.slice(2)[0] || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "/public"), {
    extensions: ["html"]
}))
app.get("/verbs", (req, res) => {
    if (!fs.existsSync("./verbs.json")) return res.status(404).send("Database was not found")
    let verbs = require("./verbs.json");
    if (verbs != null) res.status(200).send(verbs);
})

app.use(function (req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.send(`<p>The requested page ${req.path} was not found on this server.</p>`)
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.send({ error: 'Not found', url: req.path });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('404 Not found');
});

app.listen(port);
console.log(`Server now listening on port ${port}!`)