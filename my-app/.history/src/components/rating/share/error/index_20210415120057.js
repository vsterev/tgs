import React from 'react';
import { useLocation } from 'react-router-dom';
const location = useLocation();
const UserError = () => {
  return (
    <div>
      <h1>Error Page</h1>
      <div>{location.state.err}</div>
    </div>
  );
};
export default UserError;
