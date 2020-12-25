import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  const [contacts, setContacts] = useState([]);
  const [contactsTemp, setConactsTemp] = useState([]);
  const [date, setDate] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const flight = React.createRef();
  useEffect(() => {
    //   contactsService
    //     .listAll(token)
    //     .then((result) => {
    //       if (!result.status) {
    //         console.log(result.msg);
    //         return;
    //       }
    //       setContacts(result.contacts);
    //       setConactsTemp(result.contacts);
    //     })
    //     .catch((e) => console.log(e));
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(flight.current.value);
    // if (flight.current.value) {
    //   const filtredContacts = contacts.filter(
    //     (el) => (el.flightDeparture === flight.current.value) & (el.checkOut === '22.07.2020')
    //   );
    //   setContacts(filtredContacts);
    // } else {
    //   setContacts(contactsTemp);
    // }
    contactsService
      .checkOut({ date: datePreFormat(date) }, token)
      .then((result) => setContacts(result))
      .catch((e) => console.log(e));
  };
  function datePreFormat(date) {
    const dateTemp = date.split('-');
    const preformated = `${dateTemp[2]}.${dateTemp[1]}.${dateTemp[0]}`;
    return preformated;
  }
  // console.log(contacts);
  return (
    <div>
      {!contacts && <div>Loading ....</div>}
      <form onSubmit={submitHandler}>
        {/* <label htmlFor="flight">flight</label>
        <input
          type="text"
          placeholder="flight number"
          // name="search"
          ref={flight}
          // value={search}
          // onChange={(e) => console.log(e.target.value)}
        /> */}
        <label htmlFor="date">check-out date:</label>
        <input
          type="date"
          id="date"
          onChange={(e) => {
            setDate(e.target.value);
            setIsDisabled(!isDisabled);
          }}
        />
        <button type="submit" disabled={!isEnabled}>
          Search
        </button>
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
