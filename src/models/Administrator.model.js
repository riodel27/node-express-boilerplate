const { model, Schema } = require('mongoose');

const administratorSchema = Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
});

module.exports = model('Administrator', administratorSchema);
