const cron = require('node-cron');
const express = require('express');
app = express();

// Schedule tasks to be run on the server.
cron.schedule('* * * * *', function() {
    const current = new Date()
  console.log('running a task every minute '+current);
});

app.listen(3000);