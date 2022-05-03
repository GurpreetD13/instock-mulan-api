const fs = require("fs");
const filePath = './data/warehouses.json';
const inventoryModel = require('../models/inventory-model');

const knex = require("knex")(require('../knexfile'));

exports.getAll = () => {
    const allWarehouses = fs.readFileSync(filePath);
    return JSON.parse(allWarehouses);

    // knex('Warehouse')
    //     .select(
    //         'WarehouseId',
    //         'WarehouseName',
    //         'WarehouseAddress',
    //         'WarehouseCity',
    //         'WarehouseCountry'
    //     )
}

exports.saveAll = (warehouses) => {
    fs.writeFileSync(filePath, JSON.stringify(warehouses));
}

exports.getOneById = (id) => {
    const warhouses = exports.getAll();
    return warhouses.find(warhouse => warhouse.id === id);
}

exports.getSingleWarehouseInventory = (id) => {
    return inventoryModel.getAll().filter(item => item.warehouseID === id);
}
