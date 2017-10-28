"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const event_slotsRoutes = require("./routes/event_slots")

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use("/api/event_slots", event_slotsRoutes(knex));

// GENERATE ID
function generateRandomString(length) {
  let randomString = "";
  const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";


  for (var i = 0; i < length; i++) {
    randomString += charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  return randomString;
}

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Create event page
app.get("/create", (req, res) => {
  res.render("create_event");
});

app.post("/create", (req, res) => {
  //store the event information and user information
  if (!req.body.name) {
    res.status(400).send("Please input a name.");
  } else if (!req.body.email) {
    res.status(400).send("Please input an email.");
  } else if (!req.body.event_name) {
    res.status(400).send("Please input an event name.");
  } else if (!req.body.date || !req.body.time) {
    res.status(400).send("Please input at least one date and time.")
  } else {
    let uniqueId = generateRandomString(20);
    // CHECK DATABASE IF ID EXISTS ALREADY
    // IF NOT, ENTER INFO INTO DATABASE
      // id, name, email, event name, location, description, date and time options
    // IF ID ALREADY EXISTS IN DATABASE, GENERATE NEW ID
    var userTable = {email: req.body.email,
                    name: req.body.name,
                    password: ''};
    var eventsTable = {id :uniqueId,
                      description: req.body.description,
                      location: req.body.locationText,
                      title:req.body.event_name,
                      url:`http://localhost:${PORT}/${uniqueId}`
                      };
                      console.log(eventsTable.title);
    var event_slotsTable = {event_id: eventsTable.id,
                            date: req.body.date,
                            time: req.body.time};
    knex('users')
    .insert(userTable)
    .returning('id')
    .then(result => {
      let user_id = result[0];
      if(result){
        knex('events')
        .insert(eventsTable)
        .then(result => {
          if(result){
            knex('event_slots')
            .insert(event_slotsTable)
            .then(result => {
              if(result){
                knex('events_users')
                .insert({user_id, event_id: eventsTable.id ,owner: true})
                .then(result => {
                  console.log(result);
                });
              }
            });
          }
        });                                    
      }        
    })

  res.redirect("/" + uniqueId);
  }
});

app.get("/:id", (req, res) => {
  knex('events').select('*').where({id: req.params.id})
  .then(rows => {
    const event = rows[0];
    if (event) {
      // Found event respond with data
      let event = req.params.id;
      res.render('view_event', {event: event});
    } else {
      // Did not find event send 404
      res.status(404).send("Event does not exist.");
    }
  })
  .catch(error => {
    // Send error to client
    throw error;
  })
});

app.post('/:id', (req, res) => {  
  knex('users')
  .insert({name: req.body.name, email: req.body.email})
  .returning('id')
  .then(result => {
    let user_id = result[0];
    if (result) {
      return knex('event_slots').select('id').where({event_id: req.params.id})
      .then(result => {
        console.log('event-slots result: ', result[0].id);
        return knex('votes')
          .insert({user_id, slot_id: result[0].id})
          .then(result => {
            console.log(result);
          });
      })
    }
  })
  // Step: 2 Create Votes
  // insert into votes (user_id, event_id) values (user_id, slot_id[0])
})

app.post("/:id/delete", (req, res) => {
  delete // ID AND ASSOCIATED INFO FROM DATABASE
  res.redirect("/")
});


app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});


































