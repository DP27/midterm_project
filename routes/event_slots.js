"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("date")
      .from("event_slots")
      //.where("id" LIKE ??????)
      .then((results) => {
        res.json(results);
    });
  });

  return router;
}
