var express = require('express');
var path = require('path');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');
const Knex = require('knex');
const crypto = require('crypto');

app.enable('trust proxy');
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// // View engine setup
// app.set('/', path.join(__dirname, 'pug'));
// app.set('view engine', 'pug');

const knex = connect();

var port = process.env.PORT || 8080;

function connect() {
  const config = {
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE
  };

  if (
    process.env.INSTANCE_CONNECTION_NAME &&
    process.env.NODE_ENV === 'production'
  ) {
    config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
  }

  // Connect to the database
  const knex = Knex({
    client: 'mysql',
    connection: config
  });

  return knex;
}

var index = express.Router();

app.get('/', function(req, res) {
  res.render('home.pug');
});

app.post('/', function(req, res) {
  return 'hello';
  // knex('withoutEmail')
  //   .insert({
  //     timestamp: new Date(),
  //     age: req.body.age,
  //     gender: req.body.gender,
  //     weight_kg: req.body.weight,
  //     height_cm: req.body.height,
  //     goal: req.body.goal,
  //     activity_level: req.body.activity
  //   })
  //   .then(function() {
  //     console.log('Successfully added new insert');
  //   })
  //   .catch(function(err) {
  //     console.error(`Failed to add new insert`, err);
  //     if (knex) {
  //       knex.destroy();
  //     }
  //   });
});

app.post('/subscribe', function(req, res) {
  // var data = req.body.others.split('&');
  // var obj = {};
  // for (var key in data) {
  //   obj[data[key].split('=')[0]] = data[key].split('=')[1];
  // }
  // knex('withEmail')
  //   .insert({
  //     timestamp: new Date(),
  //     email: req.body.email,
  //     age: obj.age,
  //     gender: obj.gender,
  //     weight_kg: obj.weight,
  //     height_cm: obj.height,
  //     goal: obj.goal,
  //     activity_level: obj.activity
  //   })
  //   .then(function() {
  //     console.log('Successfully added new insert');
  //     return knex.destroy();
  //   })
  //   .catch(function(err) {
  //     console.error(`Failed to add new insert`, err);
  //     if (knex) {
  //       knex.destroy();
  //     }
  //   });
});

app.listen(port);
console.log('Server started on port ' + port);
