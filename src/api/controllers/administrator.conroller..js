// http layer service(orchestrator or business logic servies)
const { body, validationResult } = require('express-validator');

const AdministratorService = require('../../services/administrator.service');

module.exports = {
  validate: (method) => {
    switch (method) {
      case 'createAdministrator': {
        return [
          body('email', 'Invalid email').exists().isEmail(),
        ];
      }
      default:
        break;
    }
  },
  createAdministrator: async (req, res, next) => {
    const { name, email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const administrator = await AdministratorService.createAdministrator({ username: name, email, password });

    // might call another Service base on administrator response.

    return res.status(201).json({
      message: 'Created successfully',
      administrator,
    });
  },
};
