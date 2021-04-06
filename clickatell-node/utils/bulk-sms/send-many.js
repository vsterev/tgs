const fetch = require('node-fetch');
// const Bluebird = require('bluebird');
// const { contactModel } = require('../../models');
// fetch.Promise = Bluebird;
const bulkSmsSendMany = function (data) {
  return (
    fetch('https://api.bulksms.com/v1/messages', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        //   Accept: 'application/json',
        // Authorization: 'vvD_nqhcQ6yPbkPk5Bzk9w==',
        Authorization:
          'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
      },
    })
      .then((rs) => {
        // if (rs) {
        return rs.json();
        // return;
        // }
        // console.log('tuk ima greshka');
      })
      // .then((r) => console.log(r))
      // .then((rs) => contactModel.findOneAndUpdate({ resId: contact.resId }, { firstSendMessage: rs[0].id }))
      .catch((err) => console.log('a', err))
  );
};
module.exports = bulkSmsSendMany;
