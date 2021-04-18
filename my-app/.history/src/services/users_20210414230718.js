import config from './config';
const usersService = {
  login: (data) => {
    return fetch(`${config.backEndUrl}/user/login`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  register: (data) => {
    return fetch(`${config.backEndUrl}/user/register`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
  verify: (token) => {
    return fetch(`${config.backEndUrl}/user/verify`, {
      //   body: JSON.stringify(data),
      method: 'GET',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => console.error(e));
  },
};
export default usersService;
