const express = require('express');

const router = express.Router();

// Require the index file
const administratorRoute = require('./administrator');
const imageRoute = require('./image');

module.exports = (params) => {
  router.use('/administrator', administratorRoute(params));
  router.use('/image', imageRoute(params));

  return router;
};
