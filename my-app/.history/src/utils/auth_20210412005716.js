import React, { useState, useEffect } from 'react';
import AuthContext from './context';
import userService from '../services/users';
import parseCookie from './parseCookie';
import { useHistory } from 'react-router-dom';

const Auth = (props) => {
  const history = useHistory();
  const [user, setUser] = useState({ user: null });
  const [loggedIn, setLoggedIn] = useState(null);

  const logIn = (user) => {
    setLoggedIn(true);
    setUser(user);
  };

  const logOut = () => {
    document.cookie = 'tgs-token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/admin';
    setLoggedIn(false);
    setUser({ user: null });
  };
  useEffect(() => {
    const token = parseCookie('tgs-token');
    if (!token) {
      console.log('react_auth');
      //da se dobawi dali e expired i ako e da se logoutne
      logOut();
      return;
    }
    userService
      .verify(token)
      .then((res) => {
        // console.log(res);
        if (res.status) {
          logIn(res.userData);
          return;
        }
        console.log('tuk e');
        history.push('/admin/login');
        logOut();
        // return;
      })
      .catch((err) => console.log('a de', err));
  }, []);

  if (loggedIn === null) {
    return <div>Loading ...</div>;
  }
  return <AuthContext.Provider value={{ loggedIn, user, logIn, logOut }}>{props.children}</AuthContext.Provider>;
};

export default Auth;
