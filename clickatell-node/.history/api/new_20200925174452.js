// const Request = require('request');
const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const get = function (conent, to, apiKey) {
  // const body = { a: 1 };
  const body = { content: 'Hello world', to: '359888340639' };
  console.log(JSON.stringify(body),apiKey)
  // fetch('https://platform.clickatell.com/messages', {
  //   method: 'post',
  //   body: JSON.stringify(body),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //     Authorization: apiKey,
  //   },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
module.exports = get;
