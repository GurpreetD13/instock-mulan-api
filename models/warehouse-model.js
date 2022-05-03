const res = require("express/lib/response");
const fs = require("fs");
const filePath = './data/warehouses.json';
const inventoryModel = require('../models/inventory-model');

const knex = require("knex")(require('../knexfile'));

exports.getAll = (res) => {
    // const allWarehouses = fs.readFileSync(filePath);
    // return JSON.parse(allWarehouses);

    knex('Warehouse')
        .select(
            'Warehouse.WarehouseId',
            'Warehouse.WarehouseName',
            'Warehouse.WarehouseAddress',
            'Warehouse.WarehouseCity',
            'Warehouse.WarehouseCountry',
            'WarehouseContact.ContactName',
            'WarehouseContact.ContactPosition',
            'WarehouseContact.ContactPhone',
            'WarehouseContact.ContactEmail'
        )
        .join('WarehouseContact', 'Warehouse.WarehouseId', 'WarehouseContact.ContactWarehouseId')
        .then(data => {
            res.json(data);
            return;
            
        })
        .catch(err => {
            res.status(500).send("Error retrieving all posts");
            return;
        })
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
