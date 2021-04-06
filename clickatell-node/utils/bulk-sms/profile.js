const fetch = require('node-fetch');
const bulkSms = function (method, urlStr, data) {
  const url = `https://api.bulksms.com/v1/${urlStr}`;
  let fetchObj = {
    method: `${method}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
    },
  };
  if (data) {
    fetchObj = { ...fetchObj, body: JSON.stringify(data) };
  }
  return fetch(url, fetchObj);
  // .then((r) => r.json());
  // .catch((err) => {
  //   console.log(req);
  //   console.log('profile error fetching no internet', err);
  //   return res.status(500).json(err);
  // });
};
module.exports = bulkSms;
