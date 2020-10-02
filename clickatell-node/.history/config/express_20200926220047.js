const express = require('express');
const cors = require('cors');
const routes = require('../routes');

// const handlebars = require('express-handlebars');
// const bodyParser = require('body-parser');
// const routes = require('../routes')
// const cookieParser = require('cookie-parser');
// const courseController = require('../controllers/course');

module.exports = (app) => {
  app.use(
    cors({
      exposedHeaders: 'Authorization',
    })
  );
  app.use(express.json());

  //TODO: Setup the view engine
  //   app.engine(
  //     '.hbs',
  //     handlebars({
  //       extname: '.hbs',
  //     })
  //   );
  //   app.set('view engine', '.hbs');
  //TODO: Setup the body parser
  app.use(express.urlencoded({ extended: true })); //to recognize req.body in post request
  //   app.use(cookieParser());

  //TODO: Setup the static files
  app.use('/static', express.static('static'));
  app.use('/');
  // // app.use('/', routes);
  app.use('/', routes.contacts);
  // app.use('/home', routes.home);
  // app.use('/user', routes.user);
  // app.use('/course', routes.course);
  // app.use('*', courseController.get.notFound)
};
