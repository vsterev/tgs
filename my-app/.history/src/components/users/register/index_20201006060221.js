import React, { useState, useContext } from 'react';
import styles from '../login/user.module.css';
import userService from '../../../services/users';
import AuthContext from '../../../utils/context';
const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePass, setRePass] = useState('');
  const [errorMessage, seErrorMessage] = useState('');
  const { logIn } = useContext(AuthContext);
  const registerHandler = (e) => {
    e.preventDefault();
    if (password != rePass) {
      seErrorMessage("Password and Re-password don't match!");
      return;
    }
    userService.register({ name, email, password }).then((data) => {
      if (!!data.status) {
        const { token } = data;
      }
    });
  };
  return (
    <React.Fragment>
      <div>
        <h2>RegisterPage</h2>
        <form className={styles} onSubmit={registerHandler}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <label htmlFor="email">Email</label>
          <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="text" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <label htmlFor="rePass">Password repeat</label>
          <input type="text" id="rePass" value={rePass} onChange={(e) => setRePass(e.target.value)} />
          <button type="submit">Register</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default Register;
