import React from 'react';
import RepEditComponent from '../../reps/edit-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const ArrivalsPage = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <RepEditComponent />
      <FooterComponent />
    </React.Fragment>
  );
};
export default ArrivalsPage;
