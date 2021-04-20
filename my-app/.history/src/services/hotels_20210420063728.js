import config from './config';
const HotelsService = {
  listAll: (token) => {
    return fetch(`${config.backEndUrl}/hotels/all`, {
      // body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  hotelRating: (data, token) => {
    return fetch(`${config.backEndUrl}/hotels/ratting/${data}`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default HotelsService;
