var
  mongoose = require('mongoose'),
  // DB_NAME = require('../lib/constants/data-constants').DB_NAME,
  //
  // db = mongoose.connect('mongodb://localhost/' + DB_NAME),

  UserSchema = new mongoose.Schema({
    username: String,
    email: String
  });

//module.exports = db.model('user', userSchema);
module.exports = mongoose.model('user', UserSchema);
