const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');


const logger = require('./utils/logger');
const middlwares = require('./utils/middlewares');
const routes = require('./api/routes');
const swaggerSpec = require('./utils/swagger');

// models
const AdministratorModel = require('./models/Administrator.model');
const ImageModel = require('./models/Image.model');

// services
const AdministratorService = require('./services/administrator.service');
const ImageService = require('./services/image.service');
const ImageSharpService = require('./services/imageSharpThirdParty.service');

module.exports = (config) => {
  const app = express();

  const administrators = new AdministratorService(AdministratorModel);
  const imageService = new ImageService(ImageModel);
  const imagesSharpService = new ImageSharpService(
    config.image.imageStorage,
    config.baseUrl,
    config.image.thumbnailSize,
    config.image.defaultSize,
  );

  const morganFormat = config.nodeEnv !== 'production' ? 'dev' : 'combined';

  // morgan logger
  app.use(morgan(morganFormat, {
    skip(req, res) {
      return res.statusCode < 400;
    },
    stream: process.stderr,
  }));

  app.use(morgan(morganFormat, {
    skip(req, res) {
      return res.statusCode >= 400;
    },
    stream: process.stdout,
  }));

  // swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use(helmet());
  app.use(compression());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(middlwares.cors);

  // routes
  app.use('/api', routes({ administrators, imageService, imagesSharpService }));


  // error
  app.use((err, req, res, next) => {
  // Fallback to default node handler
    if (res.headersSent) {
      next(err);
      return;
    }

    logger.error(err.message, {
      url: req.originalUrl,
      meta: {
        code: err.code,
        method: req.method,
        path: req.path,
        route: req.route,
        body: req.body,
        params: req.params,
        query: req.query,
        ip: (req.headers && req.headers['x-forwarded-for']) || (req.connection && req.connection.remoteAddress) || (req.socket && req.socket.remoteAddress) || (req.connection && (req.connection.socket ? req.connection.socket.remoteAddress : null)),
        status: err.status || 500,
      },
    });

    if (err.code === 'BAD_USER_INPUT') {
      const errors = JSON.parse(err.message);
      res.status(err.status || 422).json({ errors });
      return;
    }

    res.status(err.status || 500);
    res.json({ error: err.message });
  });
  return app;
};
