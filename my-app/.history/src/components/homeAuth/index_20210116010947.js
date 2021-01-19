import React from 'react';
import styles from './home.module.css';
import HeaderComponent from '../core/header';
import FooterComponent from '../core/footer';
const Home = (props) => {
  return (
    <React.Fra>
      <HeaderComponent />
      <h2 className={styles.home}>Solvex travel guide System</h2>
      <h3>Autorized User</h3>
      <FooterComponent />
    </React.Fra>
  );
};
export default Home;
