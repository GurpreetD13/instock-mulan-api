const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");


const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const inv = require("../data/inventories.json");

// Function to get All inventory items
const getAllItems = () => {
  const allInventoryItems = fs.readFileSync("./data/inventories.json");
  return JSON.parse(allInventoryItems);
};
const getAllWarehouses = () => {
  const allWarehouses = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(allWarehouses);
};
const writeInventoryData = (inventoryData) => {
  fs.writeFileSync("./data/inventories.json", JSON.stringify(inventoryData));
};

//Form validation
const isInventoryFormValid = (inventoryForm) => {
  if (!inventoryForm.itemWarehouse || !inventoryForm.itemName || !inventoryForm.itemDescription || !inventoryForm.itemCategory) {
    return false;
  }
  return true;
}

//Inventory Routes
router.route("/")
  .get(inventoryController.getAllInventory)
  .post((req, res) => {

    const warehouses = getAllWarehouses();
    const inventory = getAllItems();

    if (!isInventoryFormValid(req.body)) {
      res.status(204).send("All form values must be entered!");
    } 
    
    else {
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
      writeInventoryData(inventory);
      res.status(201).send("Success");
    }
  })
  .put((req, res) => {
    const warehouses = getAllWarehouses();
    const inventory = getAllItems();
    const currentItemIndex = inventory.findIndex(item => item.id === req.body.itemId)

    if (!isInventoryFormValid(req.body)) {
      res.status(404).send('Not enought form data');
    } else {

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
      writeInventoryData(inventory);
    }
  });


router.route("/:id")
  .get(inventoryController.getSingleItem)
  .delete((req, res) => {
    const updatedInv = getAllItems().filter((inv) => inv.id !== req.params.id)
    writeInventoryData(updatedInv);
    res.status(204).send('Inventory item deleted')
  });

module.exports = router;
