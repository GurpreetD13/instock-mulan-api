const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// '/inventories' route 

// Function to get All inventory items
const getAllItems = () => {
    const allInventoryItems = fs.readFileSync('./data/inventories.json');
    return JSON.parse(allInventoryItems);
};







// '/inventories/' route
router.route('/')
    .get((req, res) => {
        res.status(200).json(getAllItems())
    })











module.exports = router;