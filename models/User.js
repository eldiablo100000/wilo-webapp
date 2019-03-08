var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  surname: String,
  username: String,
  password: String,
  buildings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Building' }],
  updated_date: { type: Date, default: Date.now },
  is_admin: false,
});

module.exports = mongoose.model('User', UserSchema);
