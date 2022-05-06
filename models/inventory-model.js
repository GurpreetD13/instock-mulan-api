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
        .catch(err => {
            return res.status(500).send({
                message: "Error Retrieving Items"
            })
        })

}

exports.saveItem = (req, res) => {
    const newItem = {
        ItemName: req.body.itemName,
        ItemDescription: req.body.itemDescription,
        ItemCategory: req.body.itemCategory,
        ItemStatus: req.body.itemIsAvailable ,
        ItemQuantity: req.body.itemQuantity,
        ItemWarehouseId: req.body.warehouseId,
        ItemWarehouse: req.body.itemWarehouse,
        };
    
    knex('Item')
        .insert(newItem)
        .then(() =>{
            res.status(201).send({
                message: "Item Added Successfully"
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error Creating Item"
            })
        })
      
}

exports.getSelectedItem = (id, res) => {
    knex('Item')
        .select('*')
        .where({'ItemId': id})
        .first()
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error Retrieving Item"
            })
        })
}

exports.updateItem = (id, req, res) => {

    const updatedItem = {
        ItemId: req.body.itemId,
        ItemWarehouseId: req.body.warehouseId,
        ItemWarehouse: req.body.itemWarehouse,
        ItemName: req.body.itemName,
        ItemDescription: req.body.itemDescription,
        ItemCategory: req.body.itemCategory,
        ItemStatus: req.body.itemIsAvailable,
        ItemQuantity: req.body.itemQuantity,
    }
    
    knex('Item')
        .update(updatedItem)
        .where({'ItemId': id})
        .then(() => {
            res.status(200).send({
                message: "Item Updated Successfully"
            })
        })
        .catch(() => {
            return res.status(500).send({
                message: "Error Updating Item"
            })
        })
}

exports.removeItem = (id, req, res) => {
    knex('Item')
        .where({'ItemId': id})
        .del()
        .then(() => {
            res.status(201).send({
                message: "Item Deleted Successfully"
            })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error Deleting Item"
            })
        })
}