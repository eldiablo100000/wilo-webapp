var mongoose = require('mongoose');

var FloorSchema = new mongoose.Schema({
  number: String,
  anchors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anchor' }], 
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Floor', FloorSchema);

