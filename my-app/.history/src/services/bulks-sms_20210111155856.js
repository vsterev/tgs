const BulkSms = {
  check: (id, token) => {
    return fetch(`http://localhost:4000/bulk-sms/message/info/${+id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
  },
};
export default BulkSms;
