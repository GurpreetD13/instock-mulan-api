const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

//Inventory Routes
router.route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createNewItem);
  
router.route("/:id")
  .get(inventoryController.getSelectedItem)
  .put(inventoryController.updateItem)
  .delete(inventoryController.removeItem);

module.exports = router;
