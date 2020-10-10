import React, { useState, useContext } from 'react';
import usersServcie from '../../../services/users';
import AuthContext from '../../../utils/context';
import style from './user.module.css';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMassage] = useState('');
  const { logIn } = useContext(AuthContext);
  function submitHandler(e) {
    e.preventDefault();
    usersServcie.login({ email, password }).then((data) => {
      if (!data.status) {
        setErrorMassage('Unsuccessful login - user not exists or password incorrect !');
        return;
      }
      const { token } = data;
      // if (token) {
      //   document.cookie = `tgs-token=${token}`;
      // }
      if (!!data.userData) {
        console.log(data);
        // logIn(data.userData);
      }
    });
  }
  const isEnabled = email.length > 0 && password.length > 0;
  return (
    <React.Fragment>
      <div>
        <h1>Administration</h1>
        <fieldset>
          <legend>login form:</legend>
          <form className={style} onSubmit={submitHandler}>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button type="submit" disabled={!isEnabled}>
              Log-in
            </button>
            {!!errorMessage && <div>{errorMessage}</div>}
          </form>
        </fieldset>
      </div>
    </React.Fragment>
  );
};
export default Login;
