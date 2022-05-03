const knex = require("knex")(require('../knexfile'));

exports.getAll = (res) => {

    knex('Warehouse')
        .select(
            'Warehouse.WarehouseId',
            'Warehouse.WarehouseName',
            'Warehouse.WarehouseAddress',
            'Warehouse.WarehouseCity',
            'Warehouse.WarehouseCountry',
            'WarehouseContact.ContactName',
            'WarehouseContact.ContactPosition',
            'WarehouseContact.ContactPhone',
            'WarehouseContact.ContactEmail'
        )
        .join('WarehouseContact', 'Warehouse.WarehouseId', 'WarehouseContact.ContactWarehouseId')
        .then(data => {
            return res.status(200).json(data);
        })
        .catch(() => {
            return res.status(500).send("Error retrieving all posts");
        })
}

exports.saveNew = (req, res) => {
    
    const newWarehouse = {
        WarehouseName: req.body.name,
        WarehouseAddress: req.body.address,
        Warehousecity: req.body.city,
        WarehouseCountry: req.body.country,
    };

    knex('Warehouse')
        .insert(newWarehouse)
        .then(data => {
            knex('WarehouseContact')
                .insert({
                    ContactName: req.body.contact.name,
                    ContactPosition: req.body.contact.position,
                    ContactPhone: req.body.contact.phone,
                    ContactEmail: req.body.contact.email, 
                    ContactWarehouseId: data[0]
                })
                .then(() =>{
                    res.status(201).send({
                        message: "Warehouse Added Successfully"
                    })
                })
        })
        .catch(err => {
            return res.status(500).send({
                message: "Error Creating warehouse"
            })
        })
}

exports.getOneById = (id, res) => {
    
    knex('Warehouse')
        .select(
            'Warehouse.WarehouseId',
            'Warehouse.WarehouseName',
            'Warehouse.WarehouseAddress',
            'Warehouse.WarehouseCity',
            'Warehouse.WarehouseCountry',
            'WarehouseContact.ContactName',
            'WarehouseContact.ContactPosition',
            'WarehouseContact.ContactPhone',
            'WarehouseContact.ContactEmail'
        )
        .join('WarehouseContact', 'Warehouse.WarehouseId', 'WarehouseContact.ContactWarehouseId')
        .where({'Warehouse.WarehouseId': id})
        .first()
        .then(warehouseData => {
            knex('item')
                .select(
                    'ItemId',
                    'ItemName',
                    'ItemDescription',
                    'ItemCategory',
                    'ItemStatus',
                    'ItemQuantity',
                    'ItemWarehouseId',
                    'ItemWarehouse'
                )
                .where({'ItemWarehouseId': id})
                .then(warehouseInventoryData => {
                    res.status(200).json([warehouseData, warehouseInventoryData]);
                })
        })
        .catch(() => {
            return res.status(500).send("Error finding warehouse");
        })

}

exports.editWarehouse = (id, req, res) => {
    const updatedWarehouse = {
        WarehouseName: req.body.name,
        WarehouseAddress: req.body.address,
        Warehousecity: req.body.city,
        WarehouseCountry: req.body.country,
    }; 

    const updatedWarehouseContact = {
        ContactName: req.body.contact.name,
        ContactPosition: req.body.contact.position,
        ContactPhone: req.body.contact.phone,
        ContactEmail: req.body.contact.email, 
    }

    knex('Warehouse')
        .update(updatedWarehouse)
        .where({'WarehouseId': id})
        .then(() => {
            knex('WarehouseContact')
                .update(updatedWarehouseContact)
                .where({'ContactWarehouseId': id})
                .then(() =>{
                    res.status(200).send({
                        message: "Warehouse Updated Successfully"
                    })
                })
        })
        .catch(() => {
            return res.status(500).send({
                message: "Error Updating warehosue"
            })
        })
}

exports.deleteWarehouse = (id, req, res) => {
    knex('Item')
        .where({'ItemWarehouseId': id})
        .del()
        .then(() => {
            knex('WarehouseContact')
            .where({'ContactWarehouseId': id})
            .del()
            .then(() => {
                knex('Warehouse')
                .where({'WarehouseId': id})
                .del()
                .then(() => {
                    res.status(201).send({
                        message: "Warehouse Added Successfully"
                    })
                })
            })
        })
        .catch(() => {
            return res.status(500).send({
                message: "Error Deleting warehosue"
            })
        })

}