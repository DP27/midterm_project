exports.seed = function(knex, Promise) {
  return knex('event_slots').del()
    .then(function () {
      return Promise.all([
        knex('event_slots').insert({id: 1,
                                    event_id: 90283,
                                    date: 12062017,
                                    time: 0830}),
        knex('event_slots').insert({id: 2,
                                    event_id: 9081,
                                    date: 12102017,
                                    time: 0645}),
        knex('event_slots').insert({id: 3,
                                    event_id: 076532,
                                    date: 12122017,
                                    time: 0315})
      ]);
    }).then(function (event_slots) {
      // associate event_slots to other database tables
    });
};
