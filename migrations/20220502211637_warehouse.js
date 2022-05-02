/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema
        .createTable('Warehouse', table => {
            table.increments('WarehouseId').primary();
            table.string('WarehouseName').notNullable();
            table.string('WarehouseAddress').notNullable();
            table.string('WarehouseCity').notNullable();
            table.string('WarehouseCountry').notNullable();
        })
        .createTable('Item', table => {
            table.increments('ItemId').primary();
            table.string('ItemName').notNullable();
            table.string('ItemDescription').notNullable();
            table.string('ItemCategory').notNullable();
            table.string('ItemStatus').notNullable();
            table.integer('ItemQuantity').notNullable();
            table.string('ItemWarehouse').notNullable();
            table
                .integer('WarehouseId')
                .unsigned()
                .references('WarehouseId')
                .inTable('Warehouse')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
        .createTable('WarehouseContact', table => {
            table.increments('ContactId').primary();
            table.string('ContactName').notNullable();
            table.string('ContactPosition').notNullable();
            table.string('ContactPhone').notNullable();
            table.string('ContactEmail').notNullable();
            table
                .integer('ContactWarehouseId')
                .unsigned()
                .references('WarehouseId')
                .inTable('Warehouse')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('Warehouse');
};
