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
    <React.Fragment>
      <div>
        Info about message:
        {messageId}
      </div>
      <div>{messageInfo.body}</div>
      <div>{messageInfo.status.type}</div>
    </React.Fragment>
  );
};
export default PopupMessage;
