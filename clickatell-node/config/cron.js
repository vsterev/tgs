const cron = require('node-cron');
const express = require('express');
app = express();
const port = 3300;

// Schedule tasks to be run on the server.
cron.schedule('0 29,30 10 * * *', function () {
  const current = new Date();
  console.log('running a task every minute ' + current);
});

app.listen(port, console.log(`Cron is listening on port ${port}!`));
