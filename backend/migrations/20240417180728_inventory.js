/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('inventory', function(table) {
      table.increments('id').primary();
      table.string('equipment').notNullable();
      table.integer('count').defaultTo(1);
      table.string('description').defaultTo('no description added');
      table.integer('user_id').unsigned();
      table.foreign('user_id').references('id').inTable('users');
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('inventory');
};
