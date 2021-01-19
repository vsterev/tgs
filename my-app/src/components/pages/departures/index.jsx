import React from 'react';
import DeparturesComponent from '../../contacts/departureByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
import { Helmet } from 'react-helmet';
import styles from './departures.module.css';
const DeparturePage = () => {
  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>TMS - Departures by date</title>
      </Helmet>
      <HeaderComponent />
      <DeparturesComponent />
      <FooterComponent />
    </div>
  );
};
export default DeparturePage;
