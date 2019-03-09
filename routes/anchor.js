var express = require('express');
var router = express.Router({ mergeParams: true });
var mongoose = require('mongoose');
var Anchor = require('../models/Anchor.js');

/* GET ALL ANCHORS */
router.get('/', function(req, res, next) {
  Anchor.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET SINGLE ANCHOR BY ID */
router.get('/:id', function(req, res, next) {
  Anchor.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE ANCHOR */
router.post('/', function(req, res, next) {
  Anchor.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE ANCHOR */
router.put('/:id', function(req, res, next) {
  Anchor.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE ANCHOR */
router.delete('/:id', function(req, res, next) {
  Anchor.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
