import config from './config';
const repsService = {
  getAll: (token) => {
    return fetch(`${config.backEndUrl}/rep/all`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.log(e));
  },
  getHotelsByRep: (repId, token) => {
    console.log(token);
    return fetch(`${config.backEndUrl}/rep/hotels-get/${repId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  repUpdate: (data, token) => {
    return fetch(`${config.backEndUrl}/rep/update`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  add: (data, token) => {
    return fetch(`${config.backEndUrl}/rep/add`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  details: (repId, token) => {
    return fetch(`${config.backEndUrl}/rep/details/${repId}`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error('vasko ->' + e));
  },
  delete: (data, token) => {
    return fetch(`${config.backEndUrl}/rep/delete/`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default repsService;
