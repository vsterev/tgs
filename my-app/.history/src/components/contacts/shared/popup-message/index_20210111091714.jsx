import React, { useState, useEffect } from 'react';
import styles from './popup-message.module.css';
import bulkSmSService from '../../../../services/bulks-sms';
const PopupMessage = ({ messageId }) => {
  useEffect(() => {
    bulkSmSService.check(messageId).then(console.log).catch(console.log);
  });
  return console.log('1');
};
export default PopupMessage;
