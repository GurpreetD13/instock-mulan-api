const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

//Inventory Routes
router.route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createNewItem);
  
router.route("/:id")
  .get(inventoryController.getSingleItem)
  .delete(inventoryController.removeItem)
  .put(inventoryController.updateItem);

module.exports = router;
