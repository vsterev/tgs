const HotelsService = {
  listAll: (data) => {
    return fetch('http://localhost:4000/user/login', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default HotelsService;
