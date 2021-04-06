import React from 'react';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import SystemComponent from '../../system';
import { Helmet } from 'react-helmet';
const SystemPage = () => {
  return (
    <div>
      <Helmet>
        <title>TMS - System properties page</title>
      </Helmet>
      <HeaderComponent />
      <div>
        <SystemComponent />
      </div>

      <FooterComponent />
    </div>
  );
};
export default SystemPage;
