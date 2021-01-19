import React from 'react';
import RepsListAllComponent from '../../reps/getAll';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './repListPage.module.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <RepsListAllComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
