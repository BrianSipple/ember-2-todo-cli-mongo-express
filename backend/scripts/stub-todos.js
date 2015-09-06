var
  MongoClient = require('mongodb').MongoClient,  // MongoClient constructor
  DB_NAME = 'emberData',
  insertTodos = require('../helpers/database/insert-todos'),
  ObjectId = require('mongodb').ObjectId,
  assert = require('assert'),

  url = 'mongodb://localhost/' + DB_NAME;

MongoClient.connect(url, { db: DB_NAME }, function (err, db) {
  assert.equal(err, null);
  insertTodos(db, function closeDbAfterInsertingTodos() {
    db.close();
  });
});
