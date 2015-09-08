var
  mongoose = require('mongoose'),
  DB_NAME = require('../lib/constants/data-constants').DB_NAME,

  db = mongoose.connect('mongodb://localhost/' + DB_NAME),

  todoSchema = new mongoose.Schema({
    title: String,
    isComplete: Boolean
  });

module.exports = db.model('todo', todoSchema);
