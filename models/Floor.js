var mongoose = require('mongoose');

var FloorSchema = new mongoose.Schema({
  number: String, 
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Floor', FloorSchema);

