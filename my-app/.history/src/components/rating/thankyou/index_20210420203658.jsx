import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './thankyou.module.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
const ThanksPage = () => {
  const location = useLocation();

  return (
    <div className={styles.thankyou}>
      <ThumbUpIcon fontSize="large" color="primary" />
      <div>Dear {location?.state?.name} Thank you for you votting!</div>
    </div>
  );
};
export default ThanksPage;
