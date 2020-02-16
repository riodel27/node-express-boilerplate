const express = require('express');

const router = express.Router();

// Require the index file
const administratorRoute = require('./administrator');

module.exports = (params) => {
  // Destructuring assignment

  // And mount it to the path speakers.
  router.use('/administrator', administratorRoute(params));


  return router;
};
