import React, { useState, useContext } from 'react';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const registerHandler = (e) => {
    e.preventDefault();
    console.log(name);
  };
  return (
    <React.Fragment>
      <div>
        <h2>RegisterPage</h2>
        <form onSubmit={registerHandler}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
        </form>
      </div>
    </React.Fragment>
  );
};
export default Register;
