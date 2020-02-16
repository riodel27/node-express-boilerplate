require('dotenv').config();

module.exports = {
  development: {
    port: 3000,
    logLevel: 'debug',
    nodeEnv: 'development',
    database: {
      url: 'mongodb://localhost:27017/winky-graphql',
    },
  },
  production: {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
    database: {
      url: process.env.MONGO_URL,
    },
  },
  staging: {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
    database: {
      url: process.env.MONGO_URL,
    },
  },
};
