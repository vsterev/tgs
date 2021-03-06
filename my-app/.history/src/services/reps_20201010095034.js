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
  getHotelsByRep: (repId, token) => {
    return fetch(`http://localhost:4000/rep/hotels-get/${repId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  repUpdate: (data, token) => {
    return fetch(`http://localhost:4000/rep/update`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default repsService;
