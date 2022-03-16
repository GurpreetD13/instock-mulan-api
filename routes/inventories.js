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


router.get('/:id', (req, res) => {
    const singleItem = getAllItems().find(item => item.id === req.params.id)

    if(!singleItem) {
        res.status(404).json({
            message: ("Item not found")
        })
        return;
    }

    res.status(201).json(singleItem)
})


module.exports = router;