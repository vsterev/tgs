// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const get = function (conent, to, apiKey) {
  // const body = { a: 1 };
  const body = `{ "content": 'Hello world', "to": '359888340639' }`;
  fetch('https://platform.clickatell.com/messages', {
    method: 'post',
    body,
    headers: { 'Content-Type': 'application/json' },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
module.exports = get;
