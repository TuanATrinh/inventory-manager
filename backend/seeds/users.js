/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt

exports.seed = async function(knex) {
  await knex('users').del();

  const users = [
    { username: 'tuan', password: 'password', role: 'admin' },
    { username: 'federer', password: 'password', role: 'inventory manager' },
    { username: 'nadal', password: 'password', role: 'inventory manager' },
    { username: 'djokovic', password: 'password', role: 'inventory manager' },
  ];

  // Hash passwords before inserting into the database
  const hashedUsers = await Promise.all(
    users.map(async user => {
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      return { ...user, password: hashedPassword };
    })
  );

  return knex('users').insert(hashedUsers);
};