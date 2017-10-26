exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return Promise.all([
        knex('users').insert({name: 'Alice Alice',
                              email: 'alice@alice.com',
                              password: 'alice'}),
        knex('users').insert({name: 'Bob Bobbly',
                              email: 'bobblybob@bobsemail.com',
                              password: 'bobbing'}),
        knex('users').insert({name: 'Charlie McCharlie',
                              email: 'charlieischarlie@charlie.com',
                              password: 'char-lie'})
      ]);
    }).then(function (users) {
      // associate users to other database tables
    });
};
