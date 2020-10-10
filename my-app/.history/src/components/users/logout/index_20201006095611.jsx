import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../utils/context';
import { useHistory } from 'react-router-dom';
const Logout = () => {
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
    history.pushState('/');
  }, []);
};
export default Logout;
