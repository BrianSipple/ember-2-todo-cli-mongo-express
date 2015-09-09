/*
 * Setup functionality for using mongoose to operate over a MongoDB instance
 */

 var
  mongoose = require('mongoose'),
  mongoSecrets = require('../secrets/mongolab'),
  DB_USERNAME = mongoSecrets.DB_USERNAME,
  DB_PASSWORD = mongoSecrets.DB_PASSWORD,
  DB_ADDRESS = mongoSecrets.DB_ADDRESS,
  DB_LOCAL_NAME = require('../lib/constants/data-constants').DEFAULT_DB_NAME,
  DB_URI = 'mongodb://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_ADDRESS,
  LOCAL_DB_URI = 'mongodb://localhost/' + DB_LOCAL_NAME;

// Create the database connection
// mongoose.connect(DB_URI);

// Temporary local DB use
DB_URI = LOCAL_DB_URI;
mongoose.connect(DB_URI);

///////////// CONNECTION EVENTS /////////

mongoose.connection.on('connected', function onMongooseConnected() {
  console.log('Mongoose default connection open to ' + DB_URI);
});

mongoose.connection.on('error', function onMongooseError(err) {
  console.log('Mongoose default connection error: ' + err);
});

mongoose.connection.on('disconnected', function onMongooseDisconnected () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function onNodeProcessEnded() {
  mongoose.connection.close(function onMongooseClosed() {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

// BRING IN SCHEMAS & MODELS to synchronize them with the db
// and allow the application to have access to them.
require('./../model/user');
require('./../model/todo');
