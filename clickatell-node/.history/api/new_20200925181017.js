const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const get = function (content, to, apiKey) {
  fetch('https://platform.clickatell.com/messages', {
    method: 'post',
    body: JSON.stringify({ content, to }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: apiKey,
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
module.exports = get;
