exports.up = function(knex, Promise) {
  return Promise.all([ 
    knex.schema.createTable('votes', function (table) {
      table.integer('user_id').unsigned().references('users.id');
      table.integer('slot_id').unsigned().references('event_slots.id');
    })
  ])  
  return knex.schema.createTable('votes', function (table) {
    table.integer('user_id').unsigned().references('users.id');
    table.integer('slot_id').unsigned().references('event_slots.id');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes');
};
