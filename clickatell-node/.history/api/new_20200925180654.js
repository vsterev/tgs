// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { json } = require('body-parser');

fetch.Promise = Bluebird;
const get = function (content, to, apiKey) {
  // const body = { a: 1 };
  // const body = '{ "content": Hello_world , "to": 59888340639 }';
  // const bodyJ = JSON.stringify(body);
  // const bodyP = JSON.parse(bodyJ);
  // console.log('stringify', bodyJ, 'parse', bodyP);
  content = JSON.stringify(content);
  to = JSON.stringify(to);
  fetch('https://platform.clickatell.com/messages', {
    method: 'post',
    body: '{"content": ' + content + ', "to": ' + to + '}',
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
