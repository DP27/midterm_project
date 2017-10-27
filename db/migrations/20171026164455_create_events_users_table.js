exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('events_users', function (table) {
      table.integer('user_id').unsigned().references('user.id')
      table.integer('event_id').unsigned().references('events.id');
      table.boolean('owner');
    })
  ]) 
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events_users');
};
