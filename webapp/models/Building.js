var mongoose = require('mongoose');

var BuildingSchema = new mongoose.Schema({
  title: String,
  description: String,
  road: String,
  number: String,
  postcode: Number,
  city: String,
  country: String,
  polygon: String,
  map_image: String,
  coordinates: [Number, Number],
  floors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Floor' }],
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Building', BuildingSchema);
