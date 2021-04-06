import React from 'react';
import styles from './manualSms.module.css';
const manualSms = () => {
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <form>
        <label for="to">
          numbers
          <input type="text" id="to"></input>
        </label>
        <textarea>as</textarea>
      </form>
    </React.Fragment>
  );
};
export default manualSms;
