const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
// const ware =require('../data/warehouses.json');
const warehouse =require('../data/warehouses.json')

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



router.delete("/:id", (req, res) => {

    const updatedWarehouses = fetchData().filter((warehouse) => warehouse.id !== req.params.id)
    // console.log(updatedWarehouses)

    saveWarehouseData(updatedWarehouses);

    res.status(204).send('Warehouse deleted')



    // for (let i = 0; i < warehouse.length; i++) {
    //   let currentWarehouse = warehouse[i];

    //   let newWarehouse = warehouse.filter((item) => item.id !== req.params.id);

    //   if (currentWarehouse.id == req.params.id) {
    //     fs.writeFile(
    //       "./data/warehouses.json",
    //       JSON.stringify(newWarehouse),
    //       (err) => {
    //         if (err) {
    //           console.log(err);
    //         }
    //       }
    //     );

    //     return res.send("Deleted " + req.params.id);
    //   }
    // }

  });


// router.delete('/:id', (req, res) => {

//         // for (let i = 0; i < warehouse.length; i++) {
//       let currentWarehouse = warehouses.filter(warehouse => warehouse.id !== req.params.id);

//       let newWarehouse = warehouse.filter((item) => item.id !== req.params.id);

//       if (currentWarehouse.id == req.params.id) {
//         fs.writeFile(
//           "./data/warehouses.json",
//           JSON.stringify(newWarehouse),
//           (err) => {
//             if (err) {
//               console.log(err);
//             }
//           }
//         );

//         return res.send("Deleted " + req.params.id);
//       }
//     // }


//     // const warehouses = ware.filter(warehouse => warehouse.id !== req.params.id);    

//     // let id= req.params.id
//     // res.status(200).send(warehouse[id])
//     // warehouses.findById


//     //   warehouses = ware.filter(warehouse => warehouse.id !== req.params.id);
//     //     res.status(202).json({
//     //     message: "successfully deleted warehouse"
//     // })


//     //  const deleted = warehouses.find(warehouse => warehouse.id === req.params.id);

//     //     if(deleted) {
//     //     warehouses = warehouses.filter(warehouse => warehouse.id !== req.params.id);
//     //    res.status(200).send('Warehouse deleted');
//     // } else {
//     //   res.status(404)
//     //   .json({ message: "Warehouse not found" })
//     // }

    
//     // const warehouseId = warehouse.find(warehouse => warehouse.id === req.params.id);
//     // warehouses.splice(warehousesId, 1);

    
    // return res.send('Warehouse deleted');

    
// })


module.exports = router;




//    warehouses = warehouses.filter(warehouse => warehouse.id !== req.params.id);

    // const warehouseById = fetchData().find(
    //     (warehouseById) => warehouseById.id === req.params.id
    //   );
    // const warehouseById = fetchData().find(
    //     (warehouseById) => warehouseById.id === req.params.id
    //   );

    // const warehouseId= Number(req.params.id);

//    const newWarehouses = warehouses.filter(warehouse => warehouse.id !== req.params.id);

//    if(!newWarehouses) {
//        response.status(500).send('Warehouse not found.');
//     } else {
//       warehouses = newWarehouses;
//       response.send(warehouses);
//     }
   
// warehouse.remove({
//     id: req.params.id
// })

// res.status(202).json(warehouses)


 // const { id } =req.params;

    // const deleted = warehouses.find(warehouse => warehouse.id === req.params.id);

    // const warehouseById = fetchData().find(
    //     (warehouseById) => warehouseById.id === req.params.id
    //   );

    // warehouses = warehouses.filter(warehouse => warehouse.id !== req.params.id);

    //    if(deleted) {
    //     warehouses = warehouses.filter(warehouse => warehouse.id !== req.params.id);
    //    res.status(200).send('Warehouse deleted');
    // } else {
    //   res.status(404)
    //   .json({ message: "Warehouse not found" })
    // }

    // if(warehouseById) {
    //     warehouses = warehouseById.filter(warehouseById => warehouseById.id !== req.params.id);
    //    res.status(200).send('Warehouse deleted');
    // } else {
    //   res.status(404)
    //   .json({ message: "Warehouse not found" })
    // }


   
    
    // res.status(202).json({
    //     message: "successfully deleted warehouse"
    // })
