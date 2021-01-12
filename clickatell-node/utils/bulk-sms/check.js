const fetch = require('node-fetch');
const bulkSmsCheck = function (i) {
  const url = `https://api.bulksms.com/v1/messages/${i}`;
  console.log(url);
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
module.exports = bulkSmsCheck;
