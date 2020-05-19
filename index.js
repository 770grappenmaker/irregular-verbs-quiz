const express = require("express");
const fs = require("fs");
const path = require("path")
const bodyParser = require("body-parser")
const port = process.argv.slice(2)[0] || 3000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public"), {
    extensions: ["html"]
}))
app.get("/verbs", (req, res) => {
    if (!fs.existsSync("./verbs2.json")) return res.status(404).send("Database was not found")
    let verbs = require("./verbs2.json");
    if (verbs != null) res.status(200).send(verbs);
})
app.post("/feedback", (req, res) => {
    res.send("Work in progress, does not work <b>yet</b>")
})

app.post("/overhoren", (req, res) => {
    let id = randomString(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    fs.writeFileSync(path.join(__dirname, "/overhoor_bestanden/", `/${id}.txt`), req.body.overhoordata);
    res.redirect(`/overhoren/${id}`)
})
app.get("/overhoren/:overhoorID", (req, res) => {
    res.send(fs.readFileSync(path.join(__dirname, "/overhoor_bestanden/", `/${req.params.overhoorID}.txt`)).toString().replace(/\r\n|\n|\r+/, "<br>") + "<br>We lovin form data :P")
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
console.log(`Open your browser on http://127.0.0.1:${port}`)

function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}