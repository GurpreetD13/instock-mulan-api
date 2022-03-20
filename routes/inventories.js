const express = require("express");
const router = express.Router();
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

// '/inventories/' route
router
  .route("/")
    .get((req, res) => {
        res.status(200).json(getAllItems());
    })
    .post((req, res) => {
        const warehouses = getAllWarehouses();
        const inventory = getAllItems();
        if (
        !req.body.id ||
        !itemWarehouse ||
        !req.body.itemName ||
        !req.body.itemDescription ||
        !req.body.itemCategory
        ) {
        res.status(204).send("Not enought form data");
        } else {
        const newItem = {
            id: uuidv4(),
            warehouseID: warehouses.find(
            (warehouse) => warehouse.name === req.body.itemWarehouse
            ).id,
            warehouseName: req.body.itemWarehouse,
            itemName: req.body.itemName,
            description: req.body.itemDescription,
            category: req.body.itemCategory,
            status:
            req.body.itemIsAvailable === "in-stock" ? "In Stock" : "Out of Stock",
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

        if (!req.body.itemWarehouse || !req.body.itemName || !req.body.itemDescription || !req.body.itemCategory) {
            res.status(404).send('Not enought form data');
        } else {

            const updatedItem = {
                id: req.body.itemId,
                warehouseID: warehouses.find(warehouse => warehouse.name === req.body.itemWarehouse).id,
                warehouseName: req.body.itemWarehouse,
                itemName: req.body.itemName,
                description: req.body.itemDescription,
                category: req.body.itemCategory,
                status: req.body.itemIsAvailable === 'In Stock' ? 'In Stock' : 'Out of Stock',
                quantity: Number(req.body.itemQuantity),
            }
            inventory[currentItemIndex] = updatedItem;
            writeInventoryData(inventory);
        }
    });


router
  .get("/:id", (req, res) => {
    const singleItem = getAllItems().find((item) => item.id === req.params.id);
    if (!singleItem) {
      res.status(404).json({
        message: "Item does not exist",
      });
      return;
    }
    res.status(200).json(singleItem);
  })

  .delete("/:id", (req, res) => {
    const updatedInv = fetchData().filter((inv) => inv.id !== req.params.id)
    saveWarehouseData(updatedInv);
    res.status(204).send('Inventory item deleted');
});

module.exports = router;
