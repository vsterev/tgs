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
};
export default ContactsService;
