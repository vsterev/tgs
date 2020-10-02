const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const sendMes = function (content, to) {
  fetch('https://platform.clickatell.com/v1/message', {
    method: 'post',
    body: JSON.stringify({
      messages: [
        {
          channel: 'whatsapp',
          to,
          content,
        },
      ],
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'vvD_nqhcQ6yPbkPk5Bzk9w==',
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
module.exports = sendMes;
