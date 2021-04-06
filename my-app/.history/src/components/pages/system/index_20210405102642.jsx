import React from 'react';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import SystemComponent from '../../system';
import { Helmet } from 'react-helmet';
import styles from './system.module.css';
const SystemPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - System properties page</title>
      </Helmet>
      <HeaderComponent />
      <SystemComponent />
      <FooterComponent />
    </div>
  );
};
export default SystemPage;
