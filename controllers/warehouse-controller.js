const warehouseModel = require('../models/warehouse-model');
const { v4: uuidv4 } = require("uuid");

phoneNumberIsValid = (phoneNumber) => {
    var phoneNumberPattern = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if(phoneNumber.match(phoneNumberPattern)) {
      return true;
    }
    return false;
  }
  
  emailIsValid = (email) => {
    var emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if(email.match(emailPattern)) {
      return true;
    }
    return false;
  }
  
  warehouseFormIsValid = (formBody) => {
    if (!formBody.name || !formBody.address || !formBody.city || !formBody.country || !formBody.contact.name || !formBody.contact.position || !formBody.contact.phone || !formBody.contact.email) {
      return false;
    }
    return true;
  }


exports.getAllWarehouses = (req, res) => {
    warehouseModel.getAll(res);
}

exports.createNewWarehouse = (req, res) => {
    // validation
    if (!warehouseFormIsValid(req.body)) {
        res.status(404).json({
          message: 'Please make sure that there are no empty fields.'
        });
      return;
    };

    if (!phoneNumberIsValid(req.body.contact.phone)) {
        res.status(404).json({
          message: 'Please enter a valid phone number.'
        });
      return;
    };

    if (!emailIsValid(req.body.contact.email)) {
        res.status(404).json({
          message: 'Please enter a valid email address.'
        });
      return;
    };

    const newWarehouse = {
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.contact.name,
            position: req.body.contact.position,
            phone: req.body.contact.phone,
            email: req.body.contact.email,
        }
    };

    const updatedWarehouses = warehouseModel.getAll();
    updatedWarehouses.push(newWarehouse);
    warehouseModel.saveAll(updatedWarehouses);
    
    res.status(201).json({
      id: newWarehouse.id,
      status: 'success',
    });
}

exports.getSingleWarehouse = (req, res) => {
    const { id } = req.params;
    const warehouseById = warehouseModel.getOneById(id);
    const warehouseInv = warehouseModel.getSingleWarehouseInventory(id);
  
    if (!warehouseById) {
      res.status(404).json({
        message: `Warehouse ${id} does not exist.`,
      });
    } else {
      res.status(200).json([warehouseById, warehouseInv]);
    }
}

exports.editWarehouse = (req, res) => {
    const updatedWarehouses = warehouseModel.getAll();
    const currentWarehouseIndex = updatedWarehouses.findIndex(warehouse => warehouse.id === req.params.id);

    if (!warehouseFormIsValid(req.body)) {
      res.status(404).json({
        message: 'Please make sure that there are no empty fields.'
      });
      return;
    };

    if (!phoneNumberIsValid(req.body.contact.phone)) {
        res.status(404).json({
          message: 'Please enter a valid phone number.'
        });
      return;
    };

    if (!emailIsValid(req.body.contact.email)) {
        res.status(404).json({
          message: 'Please enter a valid email address.'
        });
      return;
    };

    const updatedWarehouse = {
        id: req.params.id,
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        contact: {
            name: req.body.contact.name,
            position: req.body.contact.position,
            phone: req.body.contact.phone,
            email: req.body.contact.email,
        }
    }; 
    updatedWarehouses[currentWarehouseIndex] = updatedWarehouse;
    warehouseModel.saveAll(updatedWarehouses);
    res.status(204).send('Warehouse edited')
}

exports.deleteWarehouse = (req, res) => {
  const updatedWarehouses = warehouseModel.getAll().filter((warehouse) => warehouse.id !== req.params.id)
  warehouseModel.saveAll(updatedWarehouses);
  res.status(204).send('Warehouse deleted')
}