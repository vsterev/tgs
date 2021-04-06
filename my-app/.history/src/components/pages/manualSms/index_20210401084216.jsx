import React from 'react';
import { Helmet } from 'react-helmet';
import HeaderComponent from '../../core/header';
import FooterComponent from '../../core/footer';
import ManualSMSComponent from '../manualSMS';
import styles from './manualSMS.module.css';
const manualSMSPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - manual SMS sender</title>
        <HeaderComponent />
      </Helmet>
      <ManualSMSComponent />
      <FooterComponent />
    </div>
  );
};
export default manualSMSPage;
