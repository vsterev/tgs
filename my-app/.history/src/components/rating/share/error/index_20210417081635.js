import React from 'react';
import { useLocation } from 'react-router-dom';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Something is wrong</h1>
      <div>{location.state.err}</div>
    </div>
  );
};
export default UserError;
