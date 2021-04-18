import React from 'react';
import { useLocation } from 'react-router-dom';
const UserError = () => {
  const location = useLocation();
  return (
    <div>
      <h1>Error Page</h1>
      <div>{JSON.stringify(location.state.err)}</div>
    </div>
  );
};
export default UserError;
