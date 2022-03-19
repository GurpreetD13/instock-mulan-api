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

// '/warehouses' route

router.route("/").get((req, res) => {
  res.status(200).send(fetchData());
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
