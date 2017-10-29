"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {

    knex
        .select("name", "slot_id")
        .from("users")
        .innerJoin("votes", "users.id", "user_id")
        .innerJoin("event_slots", "slot_id", "event_slots.id")
        .where("event_id", req.params.id)

        .then((results) => {
          res.json(results);
        });
  });

  return router;
}
