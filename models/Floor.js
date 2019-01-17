var mongoose = require('mongoose');

var FloorSchema = new mongoose.Schema({
  floor_number: String, 
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Floor', FloorSchema);

