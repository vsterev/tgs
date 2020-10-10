import React, { useState, useContext } from 'react';

const Register = () => {
  return (
    <React.Fragment>
      <div>
        <h2>RegisterPage</h2>
        <form onSubmit="registerHandler"></form>
      </div>
    </React.Fragment>
  );
};
export default Register;
