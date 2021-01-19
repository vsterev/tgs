import React from 'react';
import RepEditComponent from '../../reps/edit-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import { Helmet } from 'react-helmet';
import styles from './repedit.module.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - Rep edit page</title>
      </Helmet>
      <HeaderComponent />
      <RepEditComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
