var
  db = require('../model/db'),
  insertTodos = require('../helpers/database/insert-todos');

insertTodos(db, function closeDbAfterInsertingTodos() {
  db.close();
});
