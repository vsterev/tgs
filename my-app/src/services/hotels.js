const HotelsService = {
  listAll: () => {
    return fetch('http://localhost:4000/hotels/all', {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default HotelsService;
