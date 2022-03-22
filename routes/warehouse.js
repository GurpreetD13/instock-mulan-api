const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");

// '/warehouses' route
router.route("/")
  .get(warehouseController.getAllWarehouses)
  .post(warehouseController.createNewWarehouse);

router.route("/:id")
  .get(warehouseController.getSingleWarehouse)
  .put(warehouseController.editWarehouse)
  .delete(warehouseController.deleteWarehouse);

module.exports = router;