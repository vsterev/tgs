import React, { useState } from 'react';
import styles from './manualSms.module.css';
import BulkSMSService from '../../../services/bulks-sms';
import parseCookie from '../../../utils/parseCookie';

const ManualSms = () => {
  const [toArr, setToArr] = useState([]);
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const token = parseCookie('tgs-token');
  const submitHandler = (e) => {
    e.preventDefault();
    const data = { message, toArr: toArr };
    BulkSMSService.manualSend(data, token)
      .then((rs) => {
        console.log('result', rs);
        setResult(rs.toArr.length);
        setMessage('');
        setToArr([]);
      })
      .catch((err) => console.log(err));
  };
  const changeHandler = (e) => {
    e.preventDefault();
    setErr(false);
    if (!/^[0-9,\ ]+$/.test(e.target.value)) {
      setErr(true);
      return;
    }
    setToArr(e.target.value.split(','));
  };
  return (
    <React.Fragment>
      <h2 className={styles.manualSms}>send manual SMS</h2>
      <div>
        <form className={styles.manualSms} onSubmit={submitHandler}>
          <label htmlFor="to" className={styles.manualSms}>
            pfone numbers{' '}
          </label>
          <input
            className={styles.manualSms}
            placeholder={'359888306607, 359885999189 /separated by commas/'}
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
            placeholder="Your transfer on 20.07 will be at 17:00 o'clock. Please wait at reception! /minimum length - 10 letters/"
            id="message"
            rows="8"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button disabled={toArr.join('').length < 6 || message.length < 10}>send</button>
          {result && <div>{result}</div>}
        </form>
      </div>
    </React.Fragment>
  );
};
export default ManualSms;
