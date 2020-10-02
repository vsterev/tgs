// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const get = function () {
  fetch('https://github.com/')
    .then((res) => res.text())
    .then((body) => console.log(body));
};
module.exports = get;
