const express = require('express');

const router = express.Router();

const AdministratorController = require('../../controllers/administrator.controller');

module.exports = (params) => {
  const { administrators: AdministratorService } = params;

  router.post(
    '/',
    AdministratorController.validate('createAdministrator'),
    AdministratorController.createAdministrator(AdministratorService),
  );

  router.get(
    '/',
    AdministratorController.GetAdministrators(AdministratorService),
  );
  return router;
};
