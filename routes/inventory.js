const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventory-controller");

//Inventory Routes
router.route("/")
  .get(inventoryController.getAllInventory)
  .post(inventoryController.createNewItem)
  .put(inventoryController.updateItem);

router.route("/:id")
  .get(inventoryController.getSingleItem)
  .delete(inventoryController.removeItem);

module.exports = router;
