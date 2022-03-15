const express = require('express');
const app = express();
const cors = require('cors');









// Routes
const warehousesRoutes = require('./routes/warehouses');
app.use('/', warehousesRoutes);

const inventoriesRoutes = require('./routes/inventories');
app.use('/', inventoriesRoutes);



// server Listening for requests on port 8080
app.listen(8080, () => { console.log("InStock server is running on port 8080") });