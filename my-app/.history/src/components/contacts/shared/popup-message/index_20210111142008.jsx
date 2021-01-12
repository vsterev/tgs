import React, { useState, useEffect } from 'react';
import styles from './popup-message.module.css';
import { useParams } from 'react-router-dom';
import bulkSmSService from '../../../../services/bulks-sms';
const PopupMessage = () => {
  const { messageId } = useParams();
  const [messageInfo, setMessageInfo] = useState({});
  useEffect(() => {
    bulkSmSService
      .check(messageId)
      .then((r) => {
        console.log(r);
        setMessageInfo(r);
      })
      .catch(console.log);
  });
  return <div>{messageId}</div>;
};
export default PopupMessage;
