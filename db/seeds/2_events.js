exports.seed = function(knex, Promise) {
    return knex('event_slots').del()
      .then(function () {
        return Promise.all([
          knex('events').insert({id: 90283,
                                 location: "Toronto"}),
          knex('events').insert({id: 9081,
                                      location: "New York"}),
          knex('events').insert({id: 076532,
                                      location: "Montreal"})
        ]);
      }).then(function (event_slots) {
        // associate event_slots to other database tables
      });
  };
  