import React, { useState } from 'react';
import usersServcie from '../../../services/users';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function submitHandler(e) {
    e.preventDefault();
    console.log(email, password);
    usersServcie;
  }
  return (
    <React.Fragment>
      <h1>Login page</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log-in</button>
      </form>
    </React.Fragment>
  );
};
export default Login;
