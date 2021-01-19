import React from 'react';
import RepAddHotelComponent from '../../reps/add-hotel';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const ArrivalsPage = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <RepAddHotelComponent />
      <FooterComponent />
    </React.Fragment>
  );
};
export default ArrivalsPage;
