/* eslint-disable consistent-return */

/** http layer service(orchestrator or business logic servies) */
const { body, validationResult } = require('express-validator');

const { UserInputError } = require('../../utils/error');
const AdministratorService = require('../../services/administrator.service');

module.exports = {
  validate: (method) => {
    switch (method) {
      case 'createAdministrator': {
        return [
          body('email', 'Invalid email')
            .exists()
            .isEmail(),
          body('password', 'required password')
            .exists(),
        ];
      }
      default:
        break;
    }
  },
  createAdministrator: async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(new UserInputError(422, JSON.stringify(errors.array())));
      }

      const administrator = await AdministratorService.createAdministrator({
        username: name,
        email,
        password,
      });

      // might call another Service base on administrator response.

      return res.status(201).json({
        message: 'Created successfully',
        administrator,
      });
    } catch (error) {
      return next(new Error(error.message));
    }
  },
};
