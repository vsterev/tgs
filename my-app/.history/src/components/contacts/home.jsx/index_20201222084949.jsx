import React, { useEffect, useState } from 'react';
import styles from './home.module.css';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  const [contacts, setContacts] = useState;
  useEffect(() => {
    repsService
      .getAll(token)
      .then((result) => {
        if (!result.status) {
          setErr(result.msg);
          return;
        }
        setReps(result.reps);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(contacts);
  return <div className={styles.title}>home contacts</div>;
};
export default HomeContacts;
