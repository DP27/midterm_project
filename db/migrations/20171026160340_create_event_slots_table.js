exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('event_slots', function (table) {
      table.increments('id').primary();
      table.string('event_id').unsigned();
      table.foreign('event_id').references('id').inTable('events');
      table.date('date');
      table.time('time');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_slots');
};
