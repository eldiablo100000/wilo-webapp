var mongoose = require('mongoose');

var AnchorSchema = new mongoose.Schema({
  name: String,
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

