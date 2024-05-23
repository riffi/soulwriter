import fs from "node:fs";

fs.readFile('./gameicons.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const json = {}
    data.split("\n").forEach((str) => {
        if(str.indexOf(';') !== -1){
            const parts = str.split(';')
            json[parts[1].trim().toLowerCase()] = parts[0].trim()
        }
    })
    console.log(json)
    fs.writeFile('./gameIconsRU.json', JSON.stringify(json), () => {})
});
