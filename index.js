const express = require('express');
const app = express();
const cors = require('cors');



// Middleware:
app.use(cors());
app.use(express.json());



// Routes
const warehousesRoutes = require('./routes/warehouses');
app.use('/warehouses', warehousesRoutes);

const inventoriesRoutes = require('./routes/inventories');
app.use('/inventories', inventoriesRoutes);



// server Listening for requests on port 8080
app.listen(8080, () => { console.log("InStock server is running on port 8080") });