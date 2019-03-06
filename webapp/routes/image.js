var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = require('../models/Image.js');
var multer = require('multer');
var path = require('path');
const UPLOAD_PATH = 'dist/uploaded'
const upload = multer({
  dest: UPLOAD_PATH
})

/* GET ALL IMAGES */
router.get('/', function(req, res, next) {
  Image.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE IMAGE BY ID */
router.get('/:id', function(req, res, next) {
  Image.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});


/* SAVE IMAGE */
router.post('/', upload.single('myFile'), function(req, res, next) {
  // upload image
  console.log(req.file)

  const image = {
    filename: req.file.filename,
    originalname: req.file.originalname,
    path: req.file.path 
  }
  Image.create(image, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE IMAGE */
router.put('/:id', function(req, res, next) {
  Image.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE IMAGE */
router.delete('/:id', function(req, res, next) {
  Image.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
