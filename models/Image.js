var mongoose = require('mongoose');

var Image = new mongoose.Schema({
  path: {
  	type: String,
  	required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalname: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('Image', Image)