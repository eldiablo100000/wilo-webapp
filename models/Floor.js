var mongoose = require('mongoose');

var FloorSchema = new mongoose.Schema({
  number: String,
  anchors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Anchor' }],
  // pathImage: String,
  // server: String,
  angleImage: Number,
  widthImage: Number,
  heightImage: Number,
  xImage: Number,
  yImage: Number,
  scaleX: Number,
  scaleY: Number,
  location: [Number],
  center: [Number],
  image: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Image' }],
  zoom: Number,
  /* location: {
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
  id_user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  id_building: { type: mongoose.Schema.Types.ObjectId, ref: 'Building' },
  updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Floor', FloorSchema);
