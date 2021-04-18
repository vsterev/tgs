import React from 'react';
import { useLocation } from 'react-router-dom';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Error Page</h1>
      <div>{location.state.detail}</div>
    </div>
  );
};
export default UserError;
