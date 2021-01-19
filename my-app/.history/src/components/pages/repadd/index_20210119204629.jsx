import React from 'react';
import RepAddComponent from '../../reps/add-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import { Helmet } from 'react-helmet';
import styles from './repadd.module.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - add representative</title>
      </Helmet>
      <HeaderComponent />
      <RepAddComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
