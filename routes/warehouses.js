const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const fetchData = () => {
    const warehouses = fs.readFileSync('./data/warehouses.json');
    return JSON.parse(warehouses);
}



// '/warehouses' route 

router.route('/')
    .get((req, res) => {
        res.status(200).send(fetchData());
    })



    
// router.delete('/:id', (req, res) => {

//         const warehouses=warehouses.filter(warehouse => warehouse.id === req.params.id);

//         warehouses.splice()

//         res.status(202).json({
//             message: "Warehouse successfully deleted"
//         })
//     })
















module.exports = router;