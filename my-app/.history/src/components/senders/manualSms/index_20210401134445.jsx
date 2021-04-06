import React from 'react';
import styles from './manualSms.module.css';
const manualSms = () => {
  return (
    <React.Fragment>
      <h2>send manual sms - new!</h2>
      <div>
        <form className={styles.manualSms} onSubmit={() => console.log('vasko')}>
          <label for="to">
            numbers
            <input type="text" id="to"></input>
          </label>
          <label htmlFor="message">
            message
            <textarea id="message">as</textarea>
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default manualSms;