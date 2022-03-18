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
    .post((req, res) => {
        console.log(req.body);
    })


router.get('/:id', (req, res) => {
    const singleItem = getAllItems().find(item => item.id === req.params.id)

    if(!singleItem) {
        res.status(404).json({
            message: "Item does not exist"
        })
        return;
    }

    res.status(200).json(singleItem)
})


module.exports = router;