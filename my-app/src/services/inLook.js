const InterLookService = {
  syncHotels: (token) => {
    return fetch('http://localhost:4000/il/get-hotels', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  syncCities: (token) => {
    return fetch('http://localhost:4000/il/get-cities', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default InterLookService;
