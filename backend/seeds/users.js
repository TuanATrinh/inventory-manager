/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.seed = async function(knex) {
  await knex('users').del();


  return knex('users').insert([
    {username: 'tuan', password: 'password', role: 'admin'},
    {username: 'federer', password: 'password', role: 'inventory manager'},
    {username: 'nadal', password: 'password', role: 'inventory manager'},
    {username: 'djokovic', password: 'password', role: 'inventory manager'},
  ]);
};

