import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import React from 'react';
import DeparturesComponent from '../../contacts/departureByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import styles from './departures.module.css';
const DeparturePage = () => {
  return (
    <div className={styles.wrapper}>
      <HeaderComponent />
      <DeparturesComponent />
      <FooterComponent />
    </div>
  );
};
export default DeparturePage;
