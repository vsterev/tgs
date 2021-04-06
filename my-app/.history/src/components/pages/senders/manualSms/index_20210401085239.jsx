import React from 'react';
import ManualSmsComponent from '../../../senders/manualSms';
import FooterComponent from '../../../core/footer';
import HeaderComponent from '../../../core/header';

import { Helmet } from 'react-helmet';
import styles from './manualSms.module.css';
const ManualSmsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - Sms manual sender</title>
      </Helmet>
      <HeaderComponent />
      <ManualSmsComponent />
      <FooterComponent />
    </div>
  );
};
export default ManualSmsPage;
