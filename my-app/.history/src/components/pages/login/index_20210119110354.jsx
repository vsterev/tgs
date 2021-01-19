import React from 'react';
import LoginComponent from '../../users/login';
import FooterComponent from '../../core/footer';
const LoginPage = () => {
  return (
    <div className={styles.wrapper}>
      <LoginComponent />
      <FooterComponent />
    </div>
  );
};
export default LoginPage;
