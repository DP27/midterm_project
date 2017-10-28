"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("users")
      .join("votes", 'users.id', '=', 'contacts.user_id')
      .join('event_slots', 'users.id', '=', 'contacts.user_id')
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
