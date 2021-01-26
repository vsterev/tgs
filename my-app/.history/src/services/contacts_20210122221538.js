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
    console.log(data);
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
    console.log(data);
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
