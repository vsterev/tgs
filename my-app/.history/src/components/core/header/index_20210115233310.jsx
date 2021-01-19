import React from 'react';
import NavigationLinks from '../../../functions/navLinks';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
const Header = () => {
  return (
    <navigation>
      <ul className={styles.navigation}>
        <li className={styles.navigation}>
          <Link to="/admin/reps/all">Reps</Link>
        </li>
        <li className={styles.navigation}>
          <Link to="/admin/contacts/departures">Departures</Link>
        </li>
        <li className={styles.navigation}>
          <Link to="/admin/contacts/arrivals">Arrivals</Link>
        </li>
      </ul>
    </navigation>
  );
};
export default Header;
