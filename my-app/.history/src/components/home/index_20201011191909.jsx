import React, { useContext, useEffect } from 'react';
import AuthContext from '../../utils/context';

import styles from './home.module.css';

const Home = (props) => {
  useEffect(() => {
    document.title = 'Home Page';
  }, []);
  const { loggedIn } = useContext(AuthContext);
  return (
    <div>
      <h2 className={styles}>Solvex travel guide System</h2>
      <h3>Not Autorized User</h3>
      <h4>{JSON.stringify(loggedIn)}</h4>
    </div>
  );
};
export default Home;
