const warehouseModel = require('../models/warehouse-model');
const formValidators = require('../utils/formValidators');

exports.getAllWarehouses = (req, res) => {
    warehouseModel.getAll(res);
}

exports.createNewWarehouse = (req, res) => {
    // validation
    if (!formValidators.warehouseFormIsValid(req.body)) {
        res.status(404).json({
          message: 'Please make sure that there are no empty fields.'
        });
      return;
    };

    if (!formValidators.phoneNumberIsValid(req.body.contact.phone)) {
        res.status(404).json({
          message: 'Please enter a valid phone number.'
        });
      return;
    };

    if (!formValidators.emailIsValid(req.body.contact.email)) {
        res.status(404).json({
          message: 'Please enter a valid email address.'
        });
      return;
    };

    warehouseModel.saveNew(req, res);
}

exports.getSingleWarehouse = (req, res) => {
    const { id } = req.params;
    warehouseModel.getOneById(id, res);
}

exports.editWarehouse = (req, res) => {
    const { id } = req.params;
    console.log('yes')

    if (!formValidators.warehouseFormIsValid(req.body)) {
      res.status(404).json({
        message: 'Please make sure that there are no empty fields.'
      });
      return;
    };

    if (!formValidators.phoneNumberIsValid(req.body.contact.phone)) {
        res.status(404).json({
          message: 'Please enter a valid phone number.'
        });
      return;
    };

    if (!formValidators.emailIsValid(req.body.contact.email)) {
        res.status(404).json({
          message: 'Please enter a valid email address.'
        });
      return;
    };
    
    warehouseModel.editWarehouse(id, req, res);
    
}

exports.deleteWarehouse = (req, res) => {
  const updatedWarehouses = warehouseModel.getAll().filter((warehouse) => warehouse.id !== req.params.id)
  warehouseModel.saveAll(updatedWarehouses);
  res.status(204).send('Warehouse deleted')
}