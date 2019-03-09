var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');
var Floor = require('../models/Floor.js');

/* GET ALL FLOORS */
router.get('/', function(req, res, next) {
  Floor.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE FLOOR BY ID */
router.get('/:id', function(req, res, next) {
  Floor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE FLOOR */
router.post('/', function(req, res, next) {
  Floor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE FLOOR */
router.put('/:id', function(req, res, next) {
  Floor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE FLOOR */
router.delete('/:id', function(req, res, next) {
  Floor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
