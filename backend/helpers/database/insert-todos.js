var
  todos = require('../../data/mock-todos'),
  assert = require('assert'),

  /**
   * Returns a function that inserts fake Todo items
   * into our Mongo database
   */
  insertTodos = module.exports = function insertTodos(db, callback) {
    db.collection('todos').insertMany(
      todos,
      function onInsertTodos (err, res) {
        assert.equal(err, null);
        //console.log(res);
        console.log('Successfully inserted todo documents into the Todos collection');
        callback(res);
      }
    );
  };
