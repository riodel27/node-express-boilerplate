const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const config = require('./config/init');

// routes
const administratorRoutes = require('./api/routes/administrator.route');

config.initializeDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(config.cors);


app.use('/api/administrator', administratorRoutes);

module.exports = app;
