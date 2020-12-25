const ContactsService = {
  listAll: (token) => {
    return fetch('http://localhost:4000', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.status(200).json(res))
      .catch((e) => {
        console.error(e);
        res.status(400).json(e);
      });
  },
};
export default ContactsService;
