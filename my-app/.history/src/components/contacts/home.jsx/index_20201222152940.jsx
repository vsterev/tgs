import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  console.log('token', token);
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    contactsService
      .listAll(token)
      .then((result) => {
        console.log(result);
        if (!result.status) {
          console.log(result.msg);
          return;
        }
        setContacts(result.contacts);
      })
      .catch((e) => console.log(e));
  }, []);
  console.log(contacts);
  return (
    <div>
      {!contacts && <div>Loading ....</div>}
      <div className={styles.title}>home contacts</div>
    </div>
  );
};
export default HomeContacts;
