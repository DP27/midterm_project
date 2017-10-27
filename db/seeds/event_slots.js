exports.seed = function(knex, Promise) {
  return knex('event_slots').del()
    .then(function () {
      return Promise.all([
        knex('event_slots').insert({date: 12062017,
                                    time: 0830}),
        knex('event_slots').insert({date: 12102017,
                                    time: 0645}),
        knex('event_slots').insert({date: 12122017,
                                    time: 0315})
      ]);
    }).then(function (event_slots) {
      // associate event_slots to other database tables
    });
};
