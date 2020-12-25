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
      <form onSubmit={submitHandler}>
        <input type="text"></input>
      </form>
      {contacts && (
        <table>
          <thead className={styles.title}>
            <tr>
              <th colSpan={12}> home contacts</th>
            </tr>

            <tr>
              <th>res. Id</th>
              <th>resort</th>
              <th>hotel</th>
              <th>check-out</th>
              <th>dep-flight</th>
              <th>tourist names</th>
              <th>tourist phone</th>
              <th>transfer</th>
              <th>time</th>
              <th>comment</th>
              <th>check-In</th>
              <th>arr-flight</th>
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
                  <td>{contact.hasTransfer ? 'yes' : 'no'}</td>
                  <td>{contact.time}</td>
                  <td>{contact.comment}</td>
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
