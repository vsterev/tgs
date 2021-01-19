import React, { useContext } from 'react';
import getNavigationLinks from '../../../functions/navLinks';
import { Link } from 'react-router-dom';
import AuthContext from '../../../utils/context';
import styles from './header.module.css';
const Header = () => {
  const { loggedIn, user } = useContext(AuthContext);
  const links = getNavigationLinks(loggedIn, user);
  return (
    <navigation>
      <ul className={styles.navigation}>
        {/* <li className={styles.navigation}>
          <Link to="/admin/reps/all">Reps</Link>
        </li>
        <li className={styles.navigation}>
          <Link to="/admin/contacts/departure">Departures</Link>
        </li>
        <li className={styles.navigation}>
          <Link to="/admin/contacts/arrival">Arrivals</Link>
        </li> */}
        {links.map((currLink) => {
          return (
            <li className={styles.navigation}>
              <Link to={currLink.path}>{currLink.title}</Link>
            </li>
          );
        })}
      </ul>
    </navigation>
  );
};
export default Header;
