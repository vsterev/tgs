import React, { useState } from 'react';
import styles from './manualSms.module.css';
const ManualSms = () => {
  const [toArr, setToArr] = useState([10]);
  const [message, setMessage] = useState('test');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('numbers', toArr);
    console.log('message', message);
  };
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to">
            numbers
            <input type="text" id="to" value={toArr.join(',')}></input>
          </label>
          <label htmlFor="message">
            message
            <input type="textarea" id="message" value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
