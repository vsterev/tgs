import React, { useContext } from 'react';
import getNavigationLinks from '../../../functions/navLinks';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AuthContext from '../../../utils/context';
import styles from './header.module.css';
const HeaderComponent = () => {
  const { loggedIn, user } = useContext(AuthContext);
  const links = getNavigationLinks(loggedIn, user);
  return (
    <navigation>
      <h1 className={styles.navigation}>TMS</h1>
      <AppBar position="static" color="transparent">
        <Toolbar className={styles.navigation}>
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
              <Button
                component={Link}
                variant="outlined"
                color="primary"
                to={currLink.path}
                className={styles.navigation}>
                {currLink.title}
              </Button>
            );
          })}
        </Toolbar>
      </AppBar>
    </navigation>
  );
};
export default HeaderComponent;
