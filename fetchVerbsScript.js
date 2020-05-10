const fs = require("fs")
let data = fs.readFileSync("verbs.txt").toString("utf-8");
let verbs = data.split("\r\n\r\n")
verbs = verbs.map(verb => verb.split("\r\n").join(", "))
verbs = verbs.map(verb => {
    let parts = verb.split(", ");
    let engels = parts.splice(0, 3).join(" ").toLowerCase();
    let nederlands = parts[0].replace(/^\(/, "").replace(/\)+$/, "")
    return {
        engels, nederlands
    }
})
fs.writeFile("verbs2.json", JSON.stringify(verbs), () => {})
console.log(`Het huidige aantal woorden is ${verbs.length} tegenover ${JSON.parse(fs.readFileSync("./verbs.json")).length} voorheen`)