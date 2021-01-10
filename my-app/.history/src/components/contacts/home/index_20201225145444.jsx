import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';
import ContactsInfo from '../shared/contacts-info';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  const [contacts, setContacts] = useState([]);
  const [date, setDate] = useState();
  const [hasTransfer, setHasTransfer] = useState('all');
  const [flight, setFlight] = useState('');
  const [hotelId, setHotelId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [transferArr, setTransferArr] = useState([]);
  const [hotelsArr, setHotelsArr] = useState({});
  const [flightsArr, setFlightsArr] = useState([]);
  // const flight = React.createRef();
  let transfer = '';
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(contacts);
    contactsService
      .checkOut({ date: datePreFormat(date), hasTransfer, flight, hotelId }, token)
      // .checkOut(searchCriteria, token)
      .then((result) => {
        setContacts(sortHotels(result));
        setFlightsArr(uniqueValFromArray(result, 'flightDeparture'));
        const hotels = result.map((rs) => rs.hotelId);
        const uniqueHotels = hotels.reduce((acc, curr) => {
          acc[curr._id] = curr.name;
          return acc;
        }, {});
        setHotelsArr(uniqueHotels);
        setTransferArr(uniqueValFromArray(result, 'hasTransfer'));
      })
      .catch((e) => console.log(e));
  };
  function datePreFormat(date) {
    const dateTemp = date.split('-');
    const preformated = `${dateTemp[2]}.${dateTemp[1]}.${dateTemp[0]}`;
    return preformated;
  }
  const uniqueValFromArray = (arr, val) => {
    return [...new Set(arr.map((e) => e[val]))];
  };
  const sortHotels = (arr) => {
    return arr.sort((a, b) => {
      if (a.hotelId.resortId.name === b.hotelId.resortId.name) {
        return a.hotelId.name.localeCompare(b.hotelId.name);
      } else {
        return a.hotelId.resortId.name.localeCompare(b.hotelId.resortId.name);
      }
    });
  };
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
            setHasTransfer('all');
            setFlight('');
            setHotelId('');
            // setSearchCriteria({ ...searchCriteria, date: datePreFormat(e.target.value) });
            setIsDisabled(false);
          }}
        />
        {contacts.length !== 0 && (
          <ContactsInfo
            transferArr={transferArr}
            setHasTransfer={setHasTransfer}
            hasTransfer={hasTransfer}
            flightsArr={flightsArr}
            setFlight={setFlight}
            flight={flight}
          />
        )}
        {/* {flightsArr.length !== 0 && (
      
        )} */}
        {/* {contacts.length > 0 && (
         
        )} */}
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
