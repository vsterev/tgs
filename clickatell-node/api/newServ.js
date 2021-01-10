const fetch = require('node-fetch');
const Bluebird = require('bluebird');

fetch.Promise = Bluebird;
const sendMes = function (content, to, channel) {
  fetch('https://platform.clickatell.com/v1/message', {
    method: 'post',
    body: JSON.stringify({
      messages: [
        {
          channel,
          to,
          content,
        },
      ],
    }),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      // Authorization: 'vvD_nqhcQ6yPbkPk5Bzk9w==',
      Authorization: 'jKTmxd7CQi2GVJKxMcx_ow==',
    },
  })
    .then((res) => res.json())
    .then((json) => console.log(json));
};
module.exports = sendMes;
