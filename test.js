const fs = require("fs");
const filePath = './data/warehouses.json';

console.log(JSON.parse(fs.readFileSync(filePath)));