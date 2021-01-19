import React from 'react';
import RepEditComponent from '../../reps/edit-rep';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './repedit.module.css';
const ArrivalsPage = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <RepEditComponent />
      <FooterComponent />
    </div>
  );
};
export default ArrivalsPage;
