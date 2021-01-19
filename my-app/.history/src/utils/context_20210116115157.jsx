import React from 'react';
const AuthenticationContext = React.createContext({
  loggedIn: false,
  name: null,
  logIn: () => {},
  logOut: () => {},
});
export default AuthenticationContext;
