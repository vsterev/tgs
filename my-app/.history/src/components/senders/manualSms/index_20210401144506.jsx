import React, { useState } from 'react';
import styles from './manualSms.module.css';
const ManualSms = () => {
  // const [toArr, setToArr] = useState([]);
  const [message, setMessage] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(message);
  };
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to">
            numbers
            <input type="text" id="to"></input>
          </label>
          <label htmlFor="message">
            message
            <input type="textarea" id="message" value={message} />
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
