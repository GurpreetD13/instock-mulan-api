const inventoryModel = require('../models/inventory-model');
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