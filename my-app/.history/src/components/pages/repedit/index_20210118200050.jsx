import React from 'react';
import RepAddComponent from '../../reps/add-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const ArrivalsPage = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <RepAddComponent />
      <FooterComponent />
    </React.Fragment>
  );
};
export default ArrivalsPage;
