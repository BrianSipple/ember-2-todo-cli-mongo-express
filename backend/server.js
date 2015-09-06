var
  express = require('express'),
  PORT = process.env.port || 4500,
  app = express();


// Setup the appropriate header for our server
app.use(function (req, res, next) {

  // Allow the server that Ember CLI will create to access our content
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');

  next();
});

app.use(require('./routes/user-routes/todos'));

app.listen(PORT, function (err) {
  if (!err) {
    console.log('Listening on port ' + PORT);
  }
});
