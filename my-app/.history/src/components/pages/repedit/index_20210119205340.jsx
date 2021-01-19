import React from 'react';
import RepEditComponent from '../../reps/edit-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './repedit.module.css';
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
