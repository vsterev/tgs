import React from 'react';
import styles from './manualSms.module.css';
const manualSms = () => {
  submitHandler(e) {
    e.preventDefault();
    console.log('vasko');
  }
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
            <input type="textarea" id="message" />
          </label>
          <button>send</button>
        </form>
      </div>
    </React.Fragment>
  );
};
export default manualSms;
