import React from 'react';
import LoginComponent from '../../users/login';
import FooterComponent from '../../core/footer';
import { Helmet } from 'react-helmet';
import styles from './login.module.css';
const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - Login page</title>
      </Helmet>
      <LoginComponent />
      <FooterComponent />
    </div>
  );
};
export default LoginPage;
