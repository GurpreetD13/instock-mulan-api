const fs = require("fs");
const filePath = './data/inventories.json';

exports.getAll = () => {
    const allInventoryItems = fs.readFileSync(filePath);
    return JSON.parse(allInventoryItems);
}

exports.saveAll = () => {
    fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));
}

exports.getOneById = (id) => {
    const inventoryItems = exports.getAll();
    return inventoryItems.find(item => item.id === id);
}