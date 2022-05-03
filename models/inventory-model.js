const res = require("express/lib/response");
const fs = require("fs");
const filePath = './data/inventories.json';
const knex = require("knex")(require('../knexfile'));

exports.getAll = (res) => {
    knex('Item')
        .select('*')
        .then(data => {
            res.status(200).json(data);
        })

}

exports.saveAll = (inventoryData) => {
    fs.writeFileSync(filePath, JSON.stringify(inventoryData));
}

exports.getOneById = (id) => {
    const inventoryItems = exports.getAll();
    return inventoryItems.find(item => item.id === id);
}