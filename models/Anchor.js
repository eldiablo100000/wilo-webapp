var mongoose = require('mongoose');

var AnchorSchema = new mongoose.Schema({
  name: String,
  id_building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  id_floor: { type: mongoose.Schema.Types.ObjectId, ref: 'Floor' },
  descryption: String,
  location: [Number],
  /*location: {
   	type: {
      type: String, // Don't do { location: { type: String } }
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },*/
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Anchor', AnchorSchema);
