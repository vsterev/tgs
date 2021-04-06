import React, { useState } from 'react';
import styles from './manualSms.module.css';
const ManualSms = () => {
  const [toArr, setToArr] = useState([]);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState('');

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
    setToArr([e.target.value.split(',')]);
  };
  return (
    <React.Fragment>
      <h2 className={styles.manualSms}>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to" id="to" className={styles.manualSms}>
            telefone numbers{' '}
          </label>
          <input
            className={styles.manualSms}
            placeholder={'359888306607, 359885999189'}
            type="text"
            id="to"
            value={toArr.join(',').trim()}
            name="to"
            onChange={changeHandler}
          />
          {err && <div className={styles.error}>please enter only numbers separeted by commas</div>}
          <label htmlFor="message" className={styles.manualSms}>
            message
          </label>
          <textarea
            className={styles.manualSms}
            placeholder="Your transfer on 20.07 will be at 17:00 o'clock. Please wait at reception!"
            id="message"
            rows="8"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
