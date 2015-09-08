var
  app = module.exports = require('express').Router(),
  //DB_NAME = require('../../lib/constants/data-constants').DB_NAME,
  mongoose = require('mongoose'),

  TodoModel = mongoose.model('todo'),

  getTodos = function getTodos (req, res) {

    console.log('Attempting to get Todos');

    TodoModel.find({}, function onTodosFound(err, todos) {

      if (err) {
        res.send({error: err});

      } else {
        console.log('Todos found: ' + todos);
        res.send({'todos': todos});
      }
    });
  },

  createTodo = function createTodo (req, res) {
    var newTodoData;
    console.log('Attempting to create a new Todo');

    if (req.body) {
      newTodoData = req.body;

      TodoModel.create(newTodoData, function onTodoCreated(err, todo) {

        console.log('onTodoCreate....');

        if (err) {
          res.send({error: err});

        } else {
          console.log('New todo created: ' + todo);
          res.send('todo', todo);
        }
      });
    }

  };

  //// IDEALLY: Proper todo and route validation might go here, as well /////

app.get('/todos', getTodos);
app.post('/todos', createTodo);


app.get('/', function (req, res) {
  res.send('Huzzah!');
  res.json({ message: 'Huzzah!' });
});
