import React, { useState } from 'react';
import styles from './manualSms.module.css';
const ManualSms = () => {
  const [toArr, setToArr] = useState([10, 20]);
  const [message, setMessage] = useState('test');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(toArr);
    console.log('message', message);
  };
  const changeHandler = (e) => {
    setToArr([e.target.value.split(',')]
  }
}
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to">
            numbers
            <input
              type="text"
              id="to"
              value={toArr.join(',').trim()}
              name="to"
              onChange={}
            />
          </label>
          <label htmlFor="message">
            message
            <textarea id="message" rows="5" cols="60" value={message} onChange={(e) => setMessage(e.target.value)} />
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
