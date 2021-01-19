import React from 'react';
import ArrivalsComponent from '../../../components/contacts/arrivalByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const ArrivalsPage = () => {
  return (
    <div className={styles.arrival}>
      <HeaderComponent />
      <ArrivalsComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
