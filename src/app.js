const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');

const { nodeEnv } = require('./config');
const config = require('./config/init');
const logger = require('./utils/logger');
const swaggerSpec = require('./utils/swagger');

const administratorRoutes = require('./api/routes/administrator.route');


const app = express();

const morganFormat = nodeEnv !== 'production' ? 'dev' : 'combined';

// init db
config.initializeDB();

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(config.cors);

// routes
app.use('/api/administrator', administratorRoutes);

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

module.exports = app;
