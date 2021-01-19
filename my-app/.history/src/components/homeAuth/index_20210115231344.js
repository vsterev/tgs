import React from 'react';
import styles from './home.module.css';
import Header from '../core/header';

const Home = (props) => {
  return (
    <div>
      <Header />
      <h2 className={styles.home}>Solvex travel guide System</h2>
      <h3>Autorized User</h3>
    </div>
  );
};
export default Home;
