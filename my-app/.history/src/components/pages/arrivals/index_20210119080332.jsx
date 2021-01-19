import React from 'react';
import ArrivalsComponent from '../../../components/contacts/arrivalByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './arrivals.module.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <ArrivalsComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
