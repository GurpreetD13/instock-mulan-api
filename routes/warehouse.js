const express = require("express");
const router = express.Router();
const warehouseController = require("../controllers/warehouse-controller");


const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


const fetchData = () => {
  const warehouses = fs.readFileSync("./data/warehouses.json");
  return JSON.parse(warehouses);
};

const fetchInv = () => {
  const inventory = fs.readFileSync("./data/inventories.json");
  return JSON.parse(inventory);
};

const writeInventoryData = (inventoryData) => {
  fs.writeFileSync('./data/inventories.json', JSON.stringify(inventoryData));
}

// Function to Save Updated warehouse data which will be used in warehouse POST and PUT requests
const saveWarehouseData = (updatedWarehousesData) => {
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehousesData));
};

phoneNumberIsValid = (phoneNumber) => {
  var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if(phoneNumber.match(phoneNumberPattern)) {
    return true;
  }
  return false;
}

emailIsValid = (email) => {
  var emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  if(email.match(emailPattern)) {
    return true;
  }
  return false;
}

warehouseFormIsValid = (formBody) => {
  if (!formBody.name || !formBody.address || !formBody.city || !formBody.country || !formBody.contact.name || !formBody.contact.position || !formBody.contact.phone || !formBody.contact.email) {
    return false;
  }
  return true;
}

// '/warehouses' route
router.route("/")
    .get(warehouseController.getAllWarehouses)
    .post(warehouseController.createNewWarehouse);



router.route("/:id")
  .get(warehouseController.getSingleWarehouse)
  .put(warehouseController.editWarehouse)
  .delete((req, res) => {
    const updatedWarehouses = fetchData().filter((warehouse) => warehouse.id !== req.params.id)
    saveWarehouseData(updatedWarehouses);
    res.status(204).send('Warehouse deleted')
  })


module.exports = router;