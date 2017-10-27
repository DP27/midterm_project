exports.up = function(knex, Promise) {
<<<<<<< HEAD:db/migrations/20171026160340_create_votes_table.js
  return Promise.all([ 
    knex.schema.createTable('votes', function (table) {
      table.integer('user_id').unsigned().references('users.id');
      table.integer('slot_id').unsigned().references('event_slots.id');
    })
  ])  
=======
  return knex.schema.createTable('votes', function (table) {
    table.integer('user_id').unsigned().references('users.id');
    table.integer('slot_id').unsigned().references('event_slots.id');
  });
>>>>>>> master:db/migrations/20171026164431_create_votes_table.js
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('votes');
};
