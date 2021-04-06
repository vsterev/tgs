const BulkSms = {
  check: (id, token) => {
    return fetch(`http://localhost:4000/bulk-sms/message/info1/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
};
export default BulkSms;
