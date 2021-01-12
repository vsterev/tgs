const BulkSms = {
  check: (id) => {
    return fetch(`http://localhost:4000/bulk-sms/message/info/${+id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Basic MDRCRDM5MUI5QkE4NDRFQzgzMUFGQTc4NEIwNUZDMzgtMDItNjo3cVBzSl82YiEzV3Y1d284SHcqcVA1MjlBdmNlVg==',
        'Access-Control-Allow-Origin': 'no',
      },
    });
  },
};
export default BulkSms;
