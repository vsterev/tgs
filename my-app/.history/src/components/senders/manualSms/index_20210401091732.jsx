import React from 'react';
import styles from './manualSms.module.css';
const manualSms = () => {
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <form>
        <label for="to">numbers</label>
        <input type="text" name="to"></input>
        <textarea>as</textarea>
      </form>
    </React.Fragment>
  );
};
export default manualSms;
