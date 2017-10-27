exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.increments('id').primary();
      table.text('description');
      table.float('longitude');
      table.float('latitude');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
