import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import usersServcie from '../../../services/users';
import AuthContext from '../../../utils/context';
import style from './user.module.css';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMassage] = useState('');
  const history = useHistory();
  const { logIn } = useContext(AuthContext);
  function submitHandler(e) {
    e.preventDefault();
    usersServcie.login({ email, password }).then((data) => {
      if (!data.status) {
        // setErrorMassage('Unsuccessful login - user not exists or password incorrect !');
        setErrorMassage(data.msg);
        return;
      }
      const { token } = data;
      if (token) {
        document.cookie = `tgs-token=${token}; path=/admin`;
      }
      if (!!data.userData) {
        logIn(data.userData);
        history.push('/admin');
      } else {
        setErrorMassage(`Unsuccessful login - user not exists or password incorrect !`);
      }
    });
  }
  const isEnabled = email.length > 0 && password.length > 0;
  return (
    <React.Fragment>
      <div className={style.login}>
        <h1>Travel Guide System Solvex</h1>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <fieldset>
          <legend>login form:</legend>
          <form className={style} onSubmit={submitHandler}>
            {/* <label htmlFor="email">Email</label>
            <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            {/* <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} /> */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Email Address"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <button type="submit" disabled={!isEnabled}>
              Log-in
            </button> */}
            <Button type="submit" fullWidth variant="contained" color="primary">
              Sign In
            </Button>
            {!!errorMessage && <div>{errorMessage}</div>}
          </form>
        </fieldset>
      </div>
    </React.Fragment>
  );
};
export default Login;
