const fs = require("fs");
const filePath = './data/warehouses.json';

exports.getAll = () => {
    const allWarehouses = fs.readFileSync(filePath);
    return JSON.parse(allWarehouses);
}

exports.saveAll = (warehouses) => {
    fs.writeFileSync(filePath, JSON.stringify(warehouses));
}

exports.getOneById = (id) => {
    const warhouses = exports.getAll();
    return warhouses.find(warhouse => warhouse.id === id);
}