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
      {contacts && (
        <table>
          <thead className={styles.title}>
            <tr>
              <th colSpan={10}> home contacts</th>
            </tr>

            <tr>
              <th>res. Id</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, i) => {
              return (
                <tr key={contact.resId}>
                  {/* <td>{i + 1}</td> */}
                  <td>{contact.resId}</td>
                  <td>{contact.hotelId.resortId.name}</td>
                  <td>{contact.hotelId.name}</td>
                  <td>{contact.checkOut}</td>
                  <td>{contact.flightDeparture}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.hasTransfer}</td>
                  <td>{contact.checkIn}</td>
                  <td>{contact.flightArrival}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default HomeContacts;
