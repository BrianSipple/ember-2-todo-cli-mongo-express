var
  app = module.exports = require('express').Router(),
  mongoose = require('mongoose'),

  TodoModel = mongoose.model('todo'),

  verifyHasBody = function verifyHasBody (req, res) {
    if (!req.body) {
      return res.status(400).send('No body data was found on the request');
    }
  },

  verifyHasParams = function verifyHasParams (req, res) {
    if (!req.params) {
      return res.status(400).send('No params were found on the request');
    }
  },

  getTodos = function getTodos (req, res) {

    verifyHasBody(req, res);
    console.log('Attempting to get Todos');

    TodoModel.find({}, function onTodosFound(err, todos) {

      if (err) {
        res.send({error: err});
      } else {
        console.log('Todos found: ' + todos);
        res.json({todos: todos});
      }
    });
  },

  createTodo = function createTodo (req, res) {

    verifyHasBody(req, res);

    var newTodo = new TodoModel(),
        newTodoData = req.body.todo;

    console.log('Attempting to create a new Todo');

    newTodo.title = newTodoData.title;
    newTodo.isComplete = newTodoData.isComplete;

    newTodo.save(function onTodoCreated(err, todo) {

      console.log('onTodoCreate....');

      if (err) {
        res.send({error: err});

      } else {
        var msg = 'New todo created: ' + todo;
        console.log(msg);
        res.json({ message: msg, todo: todo });
      }
    });
  },

  getTodo = function getTodo (req, res) {
    verifyHasParams(req, res);

    if (req.params.todo_id) {

      TodoModel.findById(req.params.todo_id, function onFindTodoById(err, todo) {

        if (err) {
          res.send({error: err })

        } else {
          console.log('Found todo by id: ' + todo);
          res.json({ todo: todo });
        }
      });
    } else {
      res.status(400).send('Could not search for todo. The request did not contain an id parameter');
    }
  },

  updateTodo = function updateTodo (req, res) {
    verifyHasBody(req, res);
    verifyHasParams(req, res);

    if (req.params.todo_id) {
      TodoModel.findById(req.params.todo_id, function updateTodoOnFind (err, todo) {

        if (err) {
          res.send({error: err});

        } else {

          console.log('Attempting to update todo');
          // Update the properties of the todo
          todo.title = req.body.todo.title;
          todo.isComplete = req.body.todo.isComplete;

          // save the todo
          todo.save(function onSaveUpdatedTodo(err, todo) {
            if (err) {
              res.send({error: err});

            } else {
              var msg = 'Todo updated: ' + todo;
              console.log(msg);
              res.json({ message: msg, todo: todo });
            }
          });
        }
      });

    } else {
      res.status(400).send('Could not search for todo. The request did not contain an id parameter');
    }
  },

  deleteTodo = function deleteTodo (req, res) {
    verifyHasParams(req, res);

    if (req.params.todo_id) {
      TodoModel.remove({
        _id: req.params.todo_id
      }, function onTodoDeleted (err, todo) {
        if (err) {
          return res.send({ error: err });

        } else {
            var msg = 'Deleted todo: ' + todo;
            console.log(msg);
            return res.send({ message: msg });
        }
      });

    } else {
      res.status(400).send('Could not search for todo. The request did not contain an id parameter');
    }
  };

app.route('/todos')
  .get(getTodos)
  .post(createTodo);

app.route('/todos/:todo_id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);
