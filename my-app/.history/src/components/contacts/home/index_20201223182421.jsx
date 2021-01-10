import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  const [contacts, setContacts] = useState([]);
  const [contactsTemp, setConactsTemp] = useState([]);
  const [date, setDate] = useState();
  const [hasTransfer, setHasTransfer] = useState('all');
  const [flight, setFlight] = useState();
  const [isDisabled, setIsDisabled] = useState(true);
  const [flightsArr, setFlightsArr] = useState([]);
  // const flight = React.createRef();
  let transfer = '';
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

    console.log(hasTransfer);

    contactsService
      .checkOut({ date: datePreFormat(date), hasTransfer, flight }, token)
      .then((result) => {
        setContacts(result);
        setFlightsArr(uniqueValFromArray(result, 'flightDeparture'));
      })
      .catch((e) => console.log(e));
    console.log(hasTransfer);
  };
  function datePreFormat(date) {
    const dateTemp = date.split('-');
    const preformated = `${dateTemp[2]}.${dateTemp[1]}.${dateTemp[0]}`;
    return preformated;
  }
  const uniqueValFromArray = (arr, val) => {
    return [...new Set(arr.map((e) => e[val]))];
  };
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
            setIsDisabled(false);
          }}
        />
        {contacts.length !== 0 && (
          <label htmlFor="hasTransfer">
            transfer
            <select
              name="cars"
              id="hasTransfer"
              onChange={(e) => {
                setHasTransfer(e.target.value);
              }}>
              <option value="false">without transfer</option>
              <option value="true">with transfer</option>
              <option value="all">all</option>
            </select>
          </label>
        )}
        {flightsArr.length !== 0 && (
          <label htmlFor="flights">
            departure flight
            <select
              name="flight"
              id="flights"
              onChange={(e) => {
                setFlight(e.target.value);
              }}>
              {flightsArr.map((fl, i) => {
                return (
                  <option key={i} value={fl}>
                    {fl}
                  </option>
                );
              })}
              <option value="">all</option>
            </select>
          </label>
        )}
        <button type="submit" disabled={isDisabled}>
          Search
        </button>
      </form>
      {contacts.length !== 0 && (
        <table>
          <thead className={styles.title}>
            <tr>
              <th colSpan={12}> tourist for {date}</th>
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