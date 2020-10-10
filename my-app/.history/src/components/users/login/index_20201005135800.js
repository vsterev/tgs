import React from 'react';
const Login = () => {
  return (
    <React.Fragment>
      <h1>Login page</h1>
      <form>
        <label for="username">Username</label>
        <input type="text" id="username" />
        <label for="password">Password</label>
        <input type="password" id="password" />
        <button type="submit">Log-in</button>
      </form>
    </React.Fragment>
  );
};
export default Login;
