import React, { useState, useEffect } from 'react';
import styles from './popup-message.module.css';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';
import bulkSmSService from '../../../../services/bulks-sms';
const PopupMessage = () => {
  const { messageId } = useParams();
  const [messageInfo, setMessageInfo] = useState({});
  const token = parseCookie('tgs-token');
  useEffect(() => {
    bulkSmSService
      .check(messageId, token)
      .then((r) => {
        console.log(r);
        setMessageInfo(r);
      })
      .catch(console.log);
  }, []);
  return (
    <main className={styles.popupwrap}>
      <div className={styles.popuptitle}>
        message id :<b> {messageId}</b>
      </div>
      {!!messageInfo?.body ? (
        <React.Fragment>
          <div>text:{messageInfo?.body}</div>
          <div>status: <b>{messageInfo?.status?.type</b>}</div>
          <div>timestamp in bulkSMS: {messageInfo?.submission?.date}</div>
          <div>number of parts: {messageInfo?.numberOfParts}</div>
          <div>credit cost: {messageInfo?.creditCost}</div>
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};
export default PopupMessage;
