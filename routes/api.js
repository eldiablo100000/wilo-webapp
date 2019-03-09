var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./config');
const building = require('./building');
const floor = require('./floor');
const anchor = require('./anchor');
const image = require('./image');

router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers.authorization;

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function(err, decoded) {       if (err) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });       } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;         next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
});
router.use('/building', building);
router.use('/floor', floor);
router.use('/anchor', anchor);
router.use('/image', image);
module.exports = router;
