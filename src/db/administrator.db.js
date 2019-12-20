// database access layer
const Administrator = require('../models/Administrator.model');

const create = async (data) => {
  try {
    const administrator = await Administrator.create(data);
    return administrator;
  } catch (error) {
    throw Error(error);
  }
};

module.exports = {
  create,
};
