const express = require('express');
const expressWinston = require('express-winston');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routes/auth');
const animalsRouter = require('./routes/animals.routes');
const categoryRouter = require('./routes/categories.routes');

const createApp = (logger) => {
  const app = express();

  app.use(expressWinston.logger({ winstonInstance: logger }));
  app.use(express.json());
  app.use(cors())
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // TODO: Serve your React App using the express server
  const buildPath = path.normalize(path.join(__dirname,  './client/build'));
  const publicPath = path.normalize(path.join(__dirname, './client/public'));
  app.use(express.static(buildPath));
  // app.use(express.static(publicPath));
  // app.use('/', (req, res) => {
  //   res.sendFile(path.join(buildPath, "..", "build", "index.html"));
  // });

  app.use('/auth', authRouter);
  app.use('/animals', animalsRouter);
  app.use('/categories', categoryRouter);

  // catch 404 and forward to error handler
  app.use((req, res) => {
    res.status(404).send('Not found');
  });

  // error handler
  app.use((err, req, res) => {
    res.status(err.status || 500);
  });

  return app;
};

module.exports = createApp;
