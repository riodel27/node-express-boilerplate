// business logic service layer
const AdministratorDb = require('../db/administrator.db');

const createAdministrator = async (data) => {
  const administrator = await AdministratorDb.create(data);

  return administrator;
};

module.exports = {
  createAdministrator,
};
