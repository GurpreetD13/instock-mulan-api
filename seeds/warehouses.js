const fs = require("fs");
const filePath = './data/warehouses.json';


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */




  exports.seed = function (knex) {
    return knex('warehouse')
      .del()
      .then(() => {
        return knex
      })
 
};
