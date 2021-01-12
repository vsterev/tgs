import React, { useState, useEffect } from 'react';
import styles from './popup-message.module.css';
import bulkSmSService from '../../../../services/bulks-sms';
const PopupMessage = ({ messageId }) => {
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
  return <div>vasko</div>;
};
export default PopupMessage;
