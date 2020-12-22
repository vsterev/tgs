import React, { useContext } from 'react';
import styles from './home.module.css';

const Home = (props) => {
  const { loggIn } = useContext();
  return (
    <div>
      <h2 className={styles}>Solvex travel guide System</h2>
      <h3>Not Autorized User</h3>
      <h4>{loggIn}</h4>
    </div>
  );
};
export default Home;
