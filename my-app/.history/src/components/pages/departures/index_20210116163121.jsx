import React from 'react';
import DeparturesComponent from '../../contacts/departureByDate';
import FooterComponent from '../../core/footer';
import HeaderComponent from '../../core/header';
const DeparturePage = () => {
  return (
    <React.Fragment>
      <HeaderComponent />
      <DeparturesComponent />
      <FooterComponent />
    </React.Fragment>
  );
};
export default DeparturePage;
