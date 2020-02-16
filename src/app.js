const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const configuration = require('./config/init');
const logger = require('./utils/logger');
const routes = require('./api/routes');
const swaggerSpec = require('./utils/swagger');

// models
const AdministratorModel = require('./models/Administrator.model');

// services
const AdministratorService = require('./services/administrator.service');

module.exports = (config) => {
  const app = express();

  app.use(helmet());
  app.use(compression());

  const administrators = new AdministratorService(AdministratorModel);

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
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(configuration.cors);

  // routes
  app.use('/api', routes({ administrators }));


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
