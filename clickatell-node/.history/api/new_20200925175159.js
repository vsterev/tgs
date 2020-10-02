// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { json } = require('body-parser');

fetch.Promise = Bluebird;
const get = function (conent, to, apiKey) {
  // const body = { a: 1 };
  const body = '{ "content": ' + Hello_world + ', "to": ' + 359888340639 + ' }';
  // const bodyJ = JSON.stringify(body);
  // const bodyP = JSON.parse(bodyJ);
  // console.log('stringify', bodyJ, 'parse', bodyP);
  fetch('https://platform.clickatell.com/messages', {
    method: 'post',
    body,
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
