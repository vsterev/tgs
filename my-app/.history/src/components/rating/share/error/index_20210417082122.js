import React from 'react';
import { useLocation } from 'react-router-dom';
import errorStyles from './error.module.css';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <h1 className={errorStyles}>Something is wrong</h1>
      <h2 className={errorStyles}>{location.state.err}</h2>
    </div>
  );
};
export default UserError;
