const repsService = {
  getAll: (token) => {
    return fetch('http://localhost:4000/rep/all', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default repsService;
