// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const get = function () {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => res.json())
    .then((body) => console.log(body));
};
module.exports = get;
