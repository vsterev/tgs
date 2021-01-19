import React from 'react';
import RepAddHotelComponent from '../../reps/add-hotel';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import { Helmet } from 'react-helmet';
import styles from './repAddHotel.model.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - attach hotels to rep</title>
      </Helmet>
      <HeaderComponent />
      <RepAddHotelComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
