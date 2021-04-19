const fetch = require('node-fetch');
const Bluebird = require('bluebird');
const { contactModel } = require('../../models');
fetch.Promise = Bluebird;
const bulkSmsSend = function (rep, contact) {
  return fetch('https://api.bulksms.com/v1/messages', {
    method: 'POST',
    body: JSON.stringify({
      to: contact.phone,
      body: `Welcome to Bulgaria ${contact.name}.Solvex is your DMC - please visit https://www.solvex.bg/${contact.resId} for more info.Travel with smile :-). Your rep is ${rep[0].familyName} on phone ${rep[0].phone}`,
    }),
    headers: {
      'Content-Type': 'application/json',
      //   Accept: 'application/json',
      // Authorization: 'vvD_nqhcQ6yPbkPk5Bzk9w==',
      Authorization:
        'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
    },
  })
    .then((res) => console.log(res.json()))
    .then((rs) => contactModel.findOneAndUpdate({ resId: contact.resId }, { firstSendMessage: rs[0].id }))
    .catch((err) => console.log(err));
};
module.exports = bulkSmsSend;
