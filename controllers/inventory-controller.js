const inventoryModel = require('../models/inventory-model');
const warehouseModel = require('../models/warehouse-model');
const { v4: uuidv4 } = require("uuid");
const formValidators = require('../utils/formValidators');

exports.getAllInventory = (req, res) => {
    inventoryModel.getAll(res);
}

exports.createNewItem = (req, res) => {

  if (!formValidators.isInventoryFormValid(req.body)) {
    res.status(204).send("All form values must be entered!");
    return;
  } 
 
  inventoryModel.saveItem(req, res);
 
}

exports.getSelectedItem = (req, res) => {
  const { id } = req.params;
  inventoryModel.getSelectedItem(id, res);
}



exports.updateItem = (req, res) => {
  const { id } = req.params;

  if (!formValidators.isInventoryFormValid(req.body)) {
    res.status(204).send("All form values must be entered!");
      return;
    } 
    
  inventoryModel.updateItem(id, req, res)
}

exports.removeItem  = (req, res) => {
    const updatedInv = inventoryModel.getAll().filter((inv) => inv.id !== req.params.id)
    inventoryModel.saveAll(updatedInv);
    res.status(204).send('Inventory item deleted')
}