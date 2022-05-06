const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8080;


// Middleware:
app.use(cors());
app.use(express.json());

// Routes
const warehousesRoutes = require('./routes/warehouse');
app.use('/warehouse', warehousesRoutes);

const inventoriesRoutes = require('./routes/inventory');
app.use('/inventory', inventoriesRoutes);

// server Listening for requests on port 8080
app.listen(PORT, () => { console.log("InStock server is running on port 8080") });