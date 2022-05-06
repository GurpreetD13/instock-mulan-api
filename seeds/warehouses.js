const fs = require("fs");
const warehouseFilePath = './data/warehouses.json';
const itemFilePath = './data/inventories.json';
const warehouseContactFilePath = './data/warehousecontacts.json';

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function (knex) {
  return knex('Warehouse').del()
    .then(() => {
      return knex('Warehouse').insert(JSON.parse(fs.readFileSync(warehouseFilePath)))
    })
    .then(() => {
      return knex('Item').del()
      .then(() => {
        return knex('Item').insert(JSON.parse(fs.readFileSync(itemFilePath)))
      })
    })
    .then(() => {
      return knex('WarehouseContact').insert(JSON.parse(fs.readFileSync(warehouseContactFilePath)))
    })
};
