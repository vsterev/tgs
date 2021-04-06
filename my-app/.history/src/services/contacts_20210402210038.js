const ContactsService = {
  listAll: (token) => {
    return fetch('http://localhost:4000', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
  checkOut: (data, token) => {
    return fetch('http://localhost:4000/checkout', {
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
  checkIn: (data, token) => {
    return fetch('http://localhost:4000/checkin', {
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
  checkInCheck: (date, token) => {
    return fetch(`http://localhost:4000/checkIn-message-contact-check/${date}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
  // bulkSmsProfile: (token) => {
  //   return fetch(`http://localhost:4000/bulk-sms/profile`, {
  //     method: 'GET',
  //     headers: { 'Content-type': 'application/json', Authorization: token },
  //   })
  //     .then((res) => res.json())
  //     .catch((e) => {
  //       console.error(e);
  //       e.json();
  //     });
  // },
  checkOutCheck: (date, token) => {
    return fetch(`http://localhost:4000/checkOut-message-contact-check/${date}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
  welcomeSendMessage: (date, token) => {
    return fetch(`http://localhost:4000/checkIn-message-bulkSms2/${date}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        e.json();
      });
  },
  goodByeSendMessage: (date, token) => {
    return fetch(`http://localhost:4000/checkOut-message-bulkSms2/${date}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.log('vasko');
        e.json();
      });
  },

  updateMany: (data, token) => {
    return fetch('http://localhost:4000/update-many-array', {
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
export default ContactsService;
