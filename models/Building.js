var mongoose = require('mongoose');

var BuildingSchema = new mongoose.Schema({
  title: String, 
  description: String,
  address: String,
  city: String,
  polygon: String,
  map_image: String,
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Floor' }],
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Building', BuildingSchema);

