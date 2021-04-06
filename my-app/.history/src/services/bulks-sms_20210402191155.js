const BulkSmsService = {
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
  manualSend: (data, token) => {
    return fetch(`http://localhost:4000/bulk-sms/manual-send`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => {
        if (res.ok) {
          console.log('tuk e');
          return res.json();
        }
        console.log('error with fetching from BulkSMS API');
      })
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
};
export default BulkSmsService;
