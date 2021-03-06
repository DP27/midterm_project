"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/:id", (req, res) => {

    knex
      .select("*")
      .from("events")
      .where("events.id", req.params.id)
      .then((results) => {
        res.json(results);
    });
  });
  
  return router;
}
