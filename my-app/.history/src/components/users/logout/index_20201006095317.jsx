import React, { useContext, useEffect } from 'react';
import AuthContext from '../../../utils/context';
const Logout = () => {
  const { logOut } = useContext(AuthContext);
};
export default Logout;
