var
  app = module.exports = require('express').Router(),
  //DB_NAME = require('../../lib/constants/data-constants').DB_NAME,
  mongoose = require('mongoose'),

  UserModel = mongoose.model('user'),

  getUsers = function getUsers (req, res) {

    console.log('Attempting to get Users');

    UserModel.find({}, function onUsersFound(err, users) {

      if (err) {
        res.send({error: err});

      } else {
        console.log('Users found: ' + users);
        res.send({'users': users});
      }
    });
  },

  createUser = function createUser (req, res) {
    var newUserData;
    console.log('Attempting to create a new User');

    if (req.body) {
      newUserData = req.body;

      UserModel.create(newUserData, function onUserCreated(err, user) {

        console.log('onUserCreate....');

        if (err) {
          res.send({error: err});

        } else {
          console.log('New user created: ' + user);
          res.send('user', user);
        }
      });
    }

  };

  //// IDEALLY: Proper user and route validation might go here, as well /////

app.get('/users', getUsers);
app.post('/users', createUser);
