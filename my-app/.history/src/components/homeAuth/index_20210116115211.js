import React, { useContext } from 'react';
import styles from './home.module.css';
import HeaderComponent from '../core/header';
import FooterComponent from '../core/footer';
import AuthContext from '../../utils/context';
const Home = (props) => {
  const { loggedIn, user } = useContext(AuthContext);
  return (
    <React.Fragment>
      <HeaderComponent />
      <h2 className={styles.home}>Solvex travel guide System</h2>
      <h3>Autorized User - {name}</h3>
      <FooterComponent />
    </React.Fragment>
  );
};
export default Home;
