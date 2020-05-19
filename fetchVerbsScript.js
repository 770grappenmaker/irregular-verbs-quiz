const fs = require("fs")
let data = fs.readFileSync("verbs3.txt").toString("utf-8");
let verbs = data.split("\r\n\r\n\r\n")
verbs = verbs.map(verb => {
    let parts = verb.split("\r\n");
    console.log(parts)
    return {
        engels: parts[1].toLowerCase(),
        nederlands: parts[0].toLowerCase()
    }
})
fs.writeFile("verbs3.json", JSON.stringify(verbs), () => {})
console.log(`Het huidige aantal woorden is ${verbs.length} tegenover ${JSON.parse(fs.readFileSync("./verbs2.json")).length} voorheen`)