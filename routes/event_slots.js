"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {

    knex
      .select("*")
      .from("event_slots")
      .where("event_id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
  
  return router;
}
