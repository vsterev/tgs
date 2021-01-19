import React from 'react';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './error.module.css';
const ArrivalsPage = ({ msg }) => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <div className={styles.wrapper}>
        <h2>Something is wrong</h2>
        <h3 className={styles.wrapper>{msg}</h3>
      </div>

      <FooterComponent />
    </React.Fragment>
  );
};
export default ArrivalsPage;
