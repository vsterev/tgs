import { set } from 'date-fns/esm';
import React, { useState } from 'react';
import styles from './manualSms.module.css';
const ManualSms = () => {
  const [toArr, setToArr] = useState([]);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState('test');

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(toArr);
    console.log('message', message);
  };
  const changeHandler = (e) => {
    e.preventDefault();
    setErr(false);
    if (!/^[0-9,]+$/.test(e.target.value)) {
      setErr(true);
      return;
    }
    console.log(/^[0-9,]+$/.test(e.target.value));
    setToArr([e.target.value.split(',')]);
  };
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to">
            telefone numbers
            <input
              placeholder={'359888306607, 359885999189'}
              type="text"
              id="to"
              value={toArr.join(',').trim()}
              name="to"
              onChange={changeHandler}
            />
          </label>
          {err && <div className={styles.error}>please enter only numbers separeted by commas</div>}
          <label htmlFor="message">
            message
            <textarea
              placeholder="Your transfer on 20.07 will be at 17:00 o\'clock. Please wait at reception!"
              id="message"
              rows="5"
              cols="60"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
