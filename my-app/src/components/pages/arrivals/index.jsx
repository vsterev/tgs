import React from 'react';
import ArrivalsComponent from '../../contacts/arrivalByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './arrivals.module.css';
import { Helmet } from 'react-helmet';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - Arrivals by date</title>
      </Helmet>
      <HeaderComponent />
      <ArrivalsComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
