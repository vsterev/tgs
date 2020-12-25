import React from 'react';
import styles from './departureByDate.module.css';
import { useParams } from 'react-router-dom';

const DepartureByDate = (props) => {
  const { date } = useParams();
  return (
    <div>
      <h1>transfer page for {date}</h1>
    </div>
  );
};
export default DepartureByDate;
