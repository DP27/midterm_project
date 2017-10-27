exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events', function (table) {
      table.string('id').primary();
      table.text('description');
      table.float('longitude');
      table.float('latitude');
      table.string('title');
      table.string('url');
    })
  ])
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
