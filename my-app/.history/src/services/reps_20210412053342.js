const repsService = {
  getAll: (token) => {
    return fetch('http://localhost:4000/rep/all', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    }).then((res) => res.json());
    // .catch((e) => console.log('vasko', e));
  },
  getHotelsByRep: (repId, token) => {
    return fetch(`http://localhost:4000/rep/hotels-get/${repId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
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
  add: (data, token) => {
    return fetch(`http://localhost:4000/rep/add`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  details: (repId, token) => {
    return fetch(`http://localhost:4000/rep/details/${repId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error('vasko ->' + e));
  },
  delete: (data, token) => {
    return fetch(`http://localhost:4000/rep/delete/`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default repsService;
