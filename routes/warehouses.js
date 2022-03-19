const express = require("express");
const router = express.Router();
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

// Function to Save Updated warehouse data which will be used in warehouse POST and PUT requests
const saveWarehouseData = (updatedWarehousesData) => {
    fs.writeFileSync('./data/warehouses.json', JSON.stringify(updatedWarehousesData))
};


// '/warehouses' route

router.route("/")
    .get((req, res) => {
        res.status(200).send(fetchData());
    })

    .post((req, res) => {
        // validation
        if (!req.body.name || !req.body.address || !req.body.city || !req.body.country ||
            !req.body.contact.name, !req.body.contact.position || !req.body.contact.phone || !req.body.contact.email) {
            res.status(404).send('Please make sure no fields are empty, and entered a vaild phone number and email format in request' )
        };
        const newWarehouse = {
            "id": uuidv4(),
            "name": req.body.name,
            "address": req.body.address,
            "city": req.body.city,
            "country": req.body.country,
            "contact": {
                "name": req.body.contact.name,
                "position": req.body.contact.position,
                "phone": req.body.contact.phone,
                "email": req.body.contact.email,
            }
        };
        // add/push newWarehouseData to All warehouses data array and save updatedWarehouses data array
        let updatedWarehouses = fetchData();
        updatedWarehouses.push(newWarehouse);

        saveWarehouseData(updatedWarehouses);

        res.status(201).json(newWarehouse);
    });







router.get("/:id", (req, res) => {
  const warehouseById = fetchData().find(
    (warehouseById) => warehouseById.id === req.params.id
  );
  const warehouseInv = fetchInv().filter(
    (warehouseInv) => warehouseInv.warehouseID === req.params.id
  );

  if (!warehouseById) {
    res.status(404).json({
      message: "No warehouse found by that ID!",
    });
  } else {
    res.status(200).json([warehouseById, warehouseInv]);
  }
});

module.exports = router;
