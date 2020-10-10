import React, { useState, useContext } from 'react';
import styles from '../login/user.module.css';
import userService from '../../../services/users';
import AuthContext from '../../../utils/context';
import { useHistory } from 'react-router-dom';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { logIn } = useContext(AuthContext);
  const history = useHistory();
  const registerHandler = (e) => {
    e.preventDefault();
    if (password != rePass) {
      setErrorMessage("Password and Re-password don't match!");
      return;
    }
    userService.register({ name, email, password }).then((data) => {
      if (!data.status) {
        setErrorMessage(data.msg);
        return;
      }
      const { token } = data;
      if (token) {
        document.cookie = `tgs-token=${token}`;
        logIn(data.userData);
      }
      history.push('/');
    });
  };
  const isEnabled = (name.length > 0) & (email.length > 0) & (password.length > 0) & (rePass.length > 0);
  return (
    <React.Fragment>
      <div>
        <h1>Register Page</h1>
        <form className={styles} onSubmit={registerHandler}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="rePass">Password repeat</label>
          <input type="text" id="rePass" value={rePass} onChange={(e) => setRePass(e.target.value)} />
          <button type="submit" disabled={!isEnabled}>
            Register
          </button>
          {!!errorMessage && <div>{errorMessage}</div>}
        </form>
      </div>
    </React.Fragment>
  );
};
export default Register;
