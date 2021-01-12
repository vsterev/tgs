const BulkSms = {
  check: (id) => {
    return fetch(`https://api.bulksms.com/v1/messages/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
         'Access-Control-Allow-Origin': *
      },
    });
  },
};
export default BulkSms;
