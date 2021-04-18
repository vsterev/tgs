import React from 'react';
import { useLocation } from 'react-router-dom';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Something is wrong</h1>
      <h2>{location.state.err}</h2>
    </div>
  );
};
export default UserError;
