import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../utils/context';
import { useHistory } from 'react-router-dom';
const Logout = () => {
  const { logOut } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    logOut();
    history.push('/login');
  }, []);
  return null;
};
export default Logout;
