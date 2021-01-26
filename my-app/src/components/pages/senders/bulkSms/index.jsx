import React from 'react';
import BulkSmsComponent from '../../senders/bulkSms';
import FooterComponent from '../../../core/footer';
import HeaderComponent from '../../../core/header';
import styles from './bulkSms.module.css';
import { Helmet } from 'react-helmet';
const BulkSmsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>BulkSMS - profile page</title>
      </Helmet>
      <HeaderComponent />
      <BulkSmsComponent />
      <FooterComponent />
    </div>
  );
};
export default BulkSmsPage;
