import React from 'react';
import HeadeComponent from '../../core/header';
import ArrivalsComponent from '../../contacts/arrivalByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const ArrivalsPage = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <ArrivalsComponent />
      <FooterComponent />
    </React.Fragment>
  );
};
export default ArrivalsPage;
