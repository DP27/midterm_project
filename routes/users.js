"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("name")
      .from("users")


      .then((results) => {
        res.json(results);
    });
  });

  return router;
}




// event slots: req.params.id === event_id
// event slots: slot_ id contains event_id
// votes: user_id associated with slot_id
// users: user_id
