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
    .get((req, res) => {
        res.status(200).send(fetchData());
    })

    .post((req, res) => {
        // validation
        if (!warehouseFormIsValid(req.body)) {
            res.status(404).json({
              message: 'Please make sure that there are no empty fields.'
            });
          return;
        };

        if (!phoneNumberIsValid(req.body.contact.phone)) {
            res.status(404).json({
              message: 'Please enter a valid phone number.'
            });
          return;
        };

        if (!emailIsValid(req.body.contact.email)) {
            res.status(404).json({
              message: 'Please enter a valid email address.'
            });
          return;
        };

        const newWarehouse = {
            id: uuidv4(),
            name: req.body.name,
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            contact: {
                name: req.body.contact.name,
                position: req.body.contact.position,
                phone: req.body.contact.phone,
                email: req.body.contact.email,
            }
        };

        let updatedWarehouses = fetchData();
        updatedWarehouses.push(newWarehouse);
        saveWarehouseData(updatedWarehouses);
        
        res.status(201).json({
          id: newWareshouse.id,
          status: 'success',
        });
    });



router.get("/:id", (req, res) => {
  const { id } = req.params;
  const warehouseById = fetchData().find((warehouseById) => warehouseById.id === id);
  const warehouseInv = fetchInv().filter((warehouseInv) => warehouseInv.warehouseID === id);

  if (!warehouseById) {
    res.status(404).json({
      message: `Warehouse ${id} does not exist.`,
    });
  } else {
    res.status(200).json([warehouseById, warehouseInv]);
  }
})
.put((req, res) => {
        const inventory = fetchInv();
        const currentItemIndex = inventory.findIndex(item => item.id === req.body.itemId);

        if (!warehouseFormIsValid(req.body)) {
          res.status(404).json({
            message: 'Please make sure that there are no empty fields.'
          });
          return;
        };

        if (!phoneNumberIsValid(req.body.contact.phone)) {
            res.status(404).json({
              message: 'Please enter a valid phone number.'
            });
          return;
        };

        if (!emailIsValid(req.body.contact.email)) {
            res.status(404).json({
              message: 'Please enter a valid email address.'
            });
          return;
        };

        const updatedItem = {
          id: req.body.id,
          name: req.body.name,
          address: req.body.address,
          city: req.body.city,
          country: req.body.country,
          contact: {
            name: req.body.contact.name,
            position: req.body.contact.position,
            phone: req.body.contact.phone,
            email: req.body.contact.email,
          }
        };
        inventory[currentItemIndex] = updatedItem;
        writeInventoryData(inventory);
    })
    .delete((req, res) => {
      const updatedWarehouses = fetchData().filter((warehouse) => warehouse.id !== req.params.id)
      saveWarehouseData(updatedWarehouses);
      res.status(204).send('Warehouse deleted')
  
    })


module.exports = router;