var
  app = module.exports = require('express').Router(),
  DB_NAME = 'emberData',
  mongoose = require('mongoose'),

  todoSchema = new mongoose.Schema({
    title: 'string',
    isComplete: 'boolean'
  }),

  TodoModel = mongoose.model('todo', todoSchema),

  getTodos = function getTodos (req, res) {

    console.log('Attempting to get Todos');

    // Tell Mongoose to connect to our MongoDB instance and look
    // for a database called emberData. If no database exists it
    // will create one for us.
    mongoose.connect('mongodb://localhost/' + DB_NAME);

    TodoModel.find({}, function findTodos(err, todos) {
      mongoose.connection.close();

      if (err) {
        res.send({error: err});

      } else {
        console.log('Todos found: ' + todos);
        res.send({'todos': todos});
      }
    });
  };

  //// IDEALLY: Proper user and route validation might go here, as well /////

app.get('/api/todos', getTodos);
