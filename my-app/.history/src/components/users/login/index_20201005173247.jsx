import React, { useState } from 'react';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  function submitHandler(e) {
    e.preventDefault();
    console.log(username, password);
  }
  return (
    <React.Fragment>
      <h1>Login page</h1>
      <form onSubmit={submitHandler}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
