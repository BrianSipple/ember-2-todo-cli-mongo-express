var
  express = require('express'),
  PORT = process.env.port || 4500,
  bodyParser = require('body-parser'),
  // Bring in our db instance, which also wires up our models
  db = require('./model/db'),

  usersRoute = require('./routes/public-routes/users'),
  todosRoute = require('./routes/public-routes/todos'),
  app = express(),
  ROUTE_PREFIX  = '/api/v1';


// Setup the appropriate header for our server
app.use(function (req, res, next) {

  // Allow the server that Ember CLI will create to access our content
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api/v1
app.use(ROUTE_PREFIX, usersRoute);
app.use(ROUTE_PREFIX, todosRoute);

app.listen(PORT, function (err) {
  if (!err) {
    console.log('Listening for magic on port ' + PORT);
  }
});
