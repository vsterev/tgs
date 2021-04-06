const BulkSms = {
  check: (id, token) => {
    return fetch(`http://localhost:4000/bulk-sms/message/info/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  bulkSmsManual: (token) => {
    return fetch(`http://localhost:4000/bulk-sms/manual-sms`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
};
export default BulkSms;
