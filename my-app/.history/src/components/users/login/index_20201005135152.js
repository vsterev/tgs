import React from 'react';
const Login = () => {
  return (
    <React.Fragment>
      <h1>Login page</h1>
      <form>
        <label for="username" />
        <input type="text" id="username" />
        <label for="password" />
        <input type="password" id="password" />
        <submit>Log-in</submit>
      </form>
    </React.Fragment>
  );
};
export default Login;
