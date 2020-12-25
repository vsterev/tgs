import React from 'react';
import styles from './error-page.module.css';
const ErrorPage = ({ msg }) => {
  return (
    <div>
      <h1>Error Page</h1>
      <div>{msg}</div>
    </div>
  );
};
