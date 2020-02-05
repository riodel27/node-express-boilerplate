const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  port: process.env.PORT,
  mongoUrl: process.env.MONGO_URL,
  logLevel: process.env.LOG_LEVEL,
  nodeEnv: process.env.NODE_ENV,
};
