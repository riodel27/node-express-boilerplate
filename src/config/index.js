require('dotenv').config();

module.exports = {
  development: {
    port: 3000,
    logLevel: 'debug',
    nodeEnv: 'development',
    baseUrl: 'http://localhost:3000/api',
    database: {
      url: 'mongodb://localhost:27017/yourdbname',
    },
    image: {
      imageStorage: './uploads/images',
      defaultSize: 300,
      thumbnailSize: 150,
    },
  },
  production: {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    database: {
      url: process.env.MONGO_URL,
    },
    image: {
      imageStorage: process.env.UPLOAD_IMAGE_DIR,
      defaultSize: 300,
      thumbnailSize: 150,
    },
  },
  staging: {
    port: process.env.PORT,
    logLevel: process.env.LOG_LEVEL,
    nodeEnv: process.env.NODE_ENV,
    baseUrl: process.env.BASE_URL,
    database: {
      url: process.env.MONGO_URL,
    },
    image: {
      imageStorage: process.env.UPLOAD_IMAGE_DIR,
      defaultSize: 300,
      thumbnailSize: 150,
    },
  },
};
