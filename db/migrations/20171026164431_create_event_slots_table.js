exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('event_slots', function (table) {
      table.increments('id').primary();
      table.integer('event_id').unsigned().references('events.id');
      table.integer('date');
      table.integer('time');
    })
  ])  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('event_slots');
};
