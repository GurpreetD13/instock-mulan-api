const inventoryModel = require('../models/inventory-model');
const warehouseModel = require('../models/warehouse-model');
const { v4: uuidv4 } = require("uuid");

const isInventoryFormValid = (inventoryForm) => {
    if (!inventoryForm.itemWarehouse || !inventoryForm.itemName || !inventoryForm.itemDescription || !inventoryForm.itemCategory) {
      return false;
    }
    return true;
}

exports.getAllInventory = (req, res) => {
    res.status(200).json(inventoryModel.getAll());
}

exports.getSingleItem = (req, res) => {
    const singleItem = inventoryModel.getAll().find((item) => item.id === req.params.id);
    if (!singleItem) {
      res.status(404).json({
        message: "Item does not exist",
      });
      return;
    }
    res.status(200).json(singleItem);
}

exports.createNewItem = (req, res) => {

    const warehouses = warehouseModel.getAll();
    const inventory = inventoryModel.getAll();

    if (!isInventoryFormValid(req.body)) {
      res.status(204).send("All form values must be entered!");
      return;
    } 
    
    const newItem = {
    id: uuidv4(),
    warehouseID: warehouses.find((warehouse) => warehouse.name === req.body.itemWarehouse).id,
    warehouseName: req.body.itemWarehouse,
    itemName: req.body.itemName,
    description: req.body.itemDescription,
    category: req.body.itemCategory,
    status: req.body.itemIsAvailable ,
    quantity: req.body.itemQuantity,
    };

    inventory.push(newItem);
    inventoryModel.saveAll(inventory);
    res.status(201).send({
        id: newItem.id,
        status: 'Success'
    });  
}

exports.updateItem = (req, res) => {
    const warehouses = warehouseModel.getAll();
    const inventory = inventoryModel.getAll();
    const currentItemIndex = inventory.findIndex(item => item.id === req.body.itemId)

    if (!isInventoryFormValid(req.body)) {
        res.status(204).send("All form values must be entered!");
        return;
    } 
     
    const updatedItem = {
    id: req.body.itemId,
    warehouseID: warehouses.find(warehouse => warehouse.name === req.body.itemWarehouse).id,
    warehouseName: req.body.itemWarehouse,
    itemName: req.body.itemName,
    description: req.body.itemDescription,
    category: req.body.itemCategory,
    status: req.body.itemIsAvailable,
    quantity: Number(req.body.itemQuantity),
    }
    inventory[currentItemIndex] = updatedItem;
    inventoryModel.saveAll(inventory);
}

exports.removeItem  = (req, res) => {
    const updatedInv = inventoryModel.getAll().filter((inv) => inv.id !== req.params.id)
    inventoryModel.saveAll(updatedInv);
    res.status(204).send('Inventory item deleted')
}