const express = require('express');

const router = express.Router();

const administratorController = require('../controllers/administrator.conroller.');

/**
 * POST create /api/administrator
 */
router.post('/', administratorController.validate('createAdministrator'), administratorController.createAdministrator);

module.exports = router;
