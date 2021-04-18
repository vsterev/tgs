import React from 'react';
const UserError = ({ err }) => {
  return (
    <div>
      <h1>Error Page</h1>
      <div>{err}</div>
    </div>
  );
};
export default UserError;
