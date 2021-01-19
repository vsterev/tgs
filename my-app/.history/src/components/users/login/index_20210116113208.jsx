import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import usersServcie from '../../../services/users';
import AuthContext from '../../../utils/context';
import style from './user.module.css';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMassage] = useState('');
  const history = useHistory();
  const { logIn } = useContext(AuthContext);
  const useStyles = makeStyles((theme) => ({
    // paper: {
    //   marginTop: theme.spacing(8),
    //   display: 'flex',
    //   flexDirection: 'column',
    //   alignItems: 'center',
    // },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
    // form: {
    //   width: '100%', // Fix IE 11 issue.
    //   marginTop: theme.spacing(0),
    // },
    // submit: {
    //   margin: theme.spacing(3, 0, 2),
    // },
  }));
  const classes = useStyles();
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorMassage('');
  };
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
    <div className={style.login}>
      <h1>Travel Messaging System - Solvex</h1>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <h2 className={style.login}>Sign In</h2>
      {/* <fieldset>
          <legend>login form:</legend> */}
      <form className={style.login} onSubmit={submitHandler}>
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
        <Button type="submit" fullWidth variant="contained" color="primary" className={style.login}>
          Sign In
        </Button>
        {/* {!!errorMessage && <div>{errorMessage}</div>} */}
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={errorMessage}
          autoHideDuration={4000}
          onClose={handleSnackClose}
          message={`Login error - ${errorMessage}`}
          action={
            <React.Fragment>
              <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </form>
      {/* </fieldset> */}
    </div>
  );
};
export default Login;
