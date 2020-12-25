import React from 'react';
import styles from './departureByDate.module.css';
import { useParams } from 'react-router-dom';

const DepartureByDate = (props) => {
  const { date } = useParams();
  console.log(date);
  return (
    <div>
      <h1>Contacts will be here</h1>
    </div>
  );
};
export default DepartureByDate;
