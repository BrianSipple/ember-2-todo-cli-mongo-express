var
  mongoose = require('mongoose'),

  TodoSchema = new mongoose.Schema({
    title: String,
    isComplete: Boolean
  });

module.exports = mongoose.model('todo', TodoSchema);
