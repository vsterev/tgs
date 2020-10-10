const userService = {
  login: () => {
    return fetch('https://localhost:4000/user/login', {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.staus) {
          const token = res.token;
          document.cookie = `tgs-token=${token}`;
        } else {
        }
      });
  },
};
