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

exports.saveNew = (req, res) => {
    
    const newWarehouse = {
        WarehouseName: req.body.name,
        WarehouseAddress: req.body.address,
        Warehousecity: req.body.city,
        WarehouseCountry: req.body.country,
    };

    knex('Warehouse')
        .insert(newWarehouse)
        .then(data => {
            knex('WarehouseContact')
                .insert({
                    ContactName: req.body.contact.name,
                    ContactPosition: req.body.contact.position,
                    ContactPhone: req.body.contact.phone,
                    ContactEmail: req.body.contact.email, 
                    ContactWarehouseId: data[0]
                })
                .then(() =>{
                    res.status(201).send({
                        message: "Warehouse Added Successfully"
                    })
                })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error Creating warehosue"
            })
        })
}

exports.getOneById = (id) => {
    const warhouses = exports.getAll();
    return warhouses.find(warhouse => warhouse.id === id);
}

exports.getSingleWarehouseInventory = (id) => {
    return inventoryModel.getAll().filter(item => item.warehouseID === id);
}
