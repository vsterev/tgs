const dbConnect = require('./config/db');
const config = require('./config/config');
const cron = require('./config/cron');
const app = require('express')();
// const routes = require('./routes');
dbConnect()
  .then(() => {
    require('./config/express')(app);
    app.use(function (err, req, res, next) {
      //global error handling
      console.error(err);
      //   res.render('500', { errorMessage: err.message });
    });
    app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
    // app.listen(3330, () => console.log('Gator app listening on port 3000!'));
    // cron;
  })
  .catch((err) => {
    console.log(err);
  });
