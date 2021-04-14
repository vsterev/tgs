import config from './config';
const InterLookService = {
  syncHotels: (token) => {
    return fetch(`${config.backEndUrl}/il/get-hotels`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  syncCities: (token) => {
    return fetch(`${config.backEndUrl}/il/get-cities`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default InterLookService;
