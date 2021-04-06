const BulkSmsService = {
  check: (id, token) => {
    return fetch(`http://localhost:4000/bulkSms/message/info/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  profile: (token) => {
    return fetch(`http://localhost:4000/bulkSms/profile`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
        // e.json();
      });
  },
  manualSend: (data, token) => {
    return fetch(`http://localhost:4000/bulkSms/manual-send`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => {
        if (!res) {
          console.error('error fetching from BulkSMS API');
          return;
        }
        console.log('tuk e');
        return res.json();
        // }
        // return res.status(400);
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
export default BulkSmsService;
