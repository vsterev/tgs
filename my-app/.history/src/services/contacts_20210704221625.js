import config from './config';
const ContactsService = {
  listAll: (token) => {
    return fetch(`${config.backEndUrl}`, {
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
  reservationInfo: (resId) => {
    return fetch(`${config.backEndUrl}/get-reservation/${resId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error('tuk e', e);
        e.json();
      });
  },
  checkOut: (data, token) => {
    return fetch(`${config.backEndUrl}/checkout`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
        return e;
      });
  },
  checkIn: (data, token) => {
    return fetch(`${config.backEndUrl}/checkin`, {
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
    return fetch(`${config.backEndUrl}/checkIn-message-contact-check/${date}`, {
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
  //   return fetch(`${config.backEndUrl}/bulk-sms/profile`, {
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
    return fetch(`${config.backEndUrl}/checkOut-message-contact-check/${date}`, {
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
    // return fetch(`${config.backEndUrl}/checkIn-message-bulkSms2/${date}`, {
    return fetch(`${config.backEndUrl}/linkMobility/checkIn-message/${date}`, {
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
    return fetch(`${config.backEndUrl}/checkOut-message-bulkSms2/${date}`, {
      // return fetch(`${config.backEndUrl}/linkMobility/checkOut-message/${date}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        e.json();
      });
  },

  updateMany: (data, token) => {
    return fetch(`${config.backEndUrl}/update-many-array`, {
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
