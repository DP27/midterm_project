exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', function(table) {
      table.dropColumn('longitude');
      table.dropColumn('latitude');
      table.string('location');
    })])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('events', function(table) {
      table.float('longitude');
      table.float('latitude');
      table.dropColumn('location');
    })])
};
