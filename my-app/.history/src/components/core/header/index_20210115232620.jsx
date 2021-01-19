import React from 'react';
import NavigationLinks from '../../../functions/navLinks';
import styles from './header.module.css';
const Header = () => {
  return (
    <navigation>
      <ul className={styles.navigation}>
        <li className={styles.navigation}>123</li>
        <li className={styles.navigation}>345</li>
      </ul>
    </navigation>
  );
};
export default Header;
