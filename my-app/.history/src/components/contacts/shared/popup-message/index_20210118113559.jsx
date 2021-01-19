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
        <i>message id</i> :<b> {messageId}</b>
      </div>
      {!!messageInfo?.body ? (
        <React.Fragment>
          <div>
            <i>status : </i>
            <b>{messageInfo?.status?.type}</b>
          </div>
          <div>
            <i>timestamp in bulkSMS : </i>
            {messageInfo?.submission?.date}
          </div>
          <div>
            <i>text : </i>
            {messageInfo?.body}
          </div>
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
