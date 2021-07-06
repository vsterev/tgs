const express = require('express');
const cors = require('cors');
const routes = require('../routes');

// const handlebars = require('express-handlebars');
// const bodyParser = require('body-parser');
// const routes = require('../routes')
// const cookieParser = require('cookie-parser');
// const courseController = require('../controllers/course');
const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3,
  message: 'Too many accounts created from this IP, please try again after an hour',
});

// only apply to requests that begin with /api/

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
  app.use('/', routes.contacts);
  // app.use('/user-vote', apiLimiter);
  app.use('/user', routes.user);
  app.use('/hotels', routes.hotel);
  app.use('/resorts', routes.resort);
  app.use('/rep', routes.rep);
  app.use('/transfers', routes.transfer);
  app.use('/bulkSms', routes.bulkSms);
  app.use('/linkMobility', routes.linkMobility);
  app.use('/il', routes.inlooks);
  // app.use('*', courseController.get.notFound)
};
