var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Building = require('../models/Building.js');

/* GET ALL BUILDINGS */
router.get('/', function(req, res, next) {
  Building.find({}, null, {sort: 'title'}, function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE BUILDING BY ID */
router.get('/:id', function(req, res, next) {
  Building.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BUILDING */
router.post('/', function(req, res, next) {
  Building.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE BUILDING */
router.put('/:id', function(req, res, next) {
  Building.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BUILDING */
router.delete('/:id', function(req, res, next) {
  Building.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
