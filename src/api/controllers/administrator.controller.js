/* eslint-disable consistent-return */

const { body, validationResult } = require('express-validator');

const { UserInputError } = require('../../utils/error');

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
  createAdministrator: (AdministratorService) => async (req, res, next) => {
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

      return res.status(201).json(administrator);
    } catch (error) {
      return next(new Error(error.message));
    }
  },
  GetAdministrators: (AdministratorService) => async (req, res, next) => {
    try {
      const administrators = await AdministratorService.getList();

      return res.status(201).json(administrators);
    } catch (error) {
      return next(new Error(error.message));
    }
  },
};
