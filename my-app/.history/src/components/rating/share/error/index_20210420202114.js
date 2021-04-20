import React from 'react';
import { useLocation } from 'react-router-dom';
import errorStyles from './error.module.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <div>
        {' '}
        <ErrorOutlineIcon fontSize="large" color="error" />
      </div>
      <h2 className={errorStyles}>Something is wrong</h2>
      <h3 className={errorStyles}>{location.state.err}</h3>
    </div>
  );
};
export default UserError;
