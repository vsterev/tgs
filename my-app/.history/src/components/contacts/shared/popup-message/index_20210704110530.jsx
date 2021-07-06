import React, { useState, useEffect } from 'react';
import styles from './popup-message.module.css';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';
import bulkSmsService from '../../../../services/bulks-sms';
const PopupMessage = () => {
  const { messageId } = useParams();
  const [messageInfo, setMessageInfo] = useState({});
  const token = parseCookie('tgs-token');
  useEffect(() => {
    bulkSmsService
      .check(messageId, token)
      .then((r) => {
        console.log(r);
        setMessageInfo(r);
      })
      .catch(console.log('vasko'));
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
            <i>timestamp in system povider : </i>
            {messageInfo?.submission?.date}
          </div>
          <div>
            <i>text : </i>
            {messageInfo?.body}
          </div>
          {!!messageInfo.numberOfParts && (
            <div>
              <i>number of parts : </i>
              {messageInfo.numberOfParts}
            </div>
          )}
          {!!messageInfo.creditCost && (
            <div>
              <i>credit cost : </i>
              {messageInfo.creditCost}
            </div>
          )}
        </React.Fragment>
      ) : (
        <div>Loading...</div>
      )}
    </main>
  );
};
export default PopupMessage;
