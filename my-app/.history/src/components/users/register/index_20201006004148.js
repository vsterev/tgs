import React, { useState, useContext } from 'react';
const Register = () => {
  const [name, setName] = useState('');
  const registerHandler = () => {
    e.preventDefault();
    console.log(name);
  };
  return (
    <React.Fragment>
      <div>
        <h2>RegisterPage</h2>
        <form onSubmit={registerHandler}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(е) => setName(e.target.value)} />
        </form>
      </div>
    </React.Fragment>
  );
};
export default Register;
