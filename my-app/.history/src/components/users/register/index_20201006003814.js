import React, { useState, useContext } from 'react';
const [name, setName] = useState('');
const Register = () => {
  return (
    <React.Fragment>
      <div>
        <h2>RegisterPage</h2>
        <form onSubmit={registerHandler}>
          <input type="text" id="name" value={name} onChange={(е) => set} />
        </form>
      </div>
    </React.Fragment>
  );
};
export default Register;
