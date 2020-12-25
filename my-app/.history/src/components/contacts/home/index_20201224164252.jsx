import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';

const HomeContacts = (props) => {
  const token = parseCookie('tgs-token');
  const [contacts, setContacts] = useState([]);
  const [date, setDate] = useState();
  const [hasTransfer, setHasTransfer] = useState('all');
  const [flight, setFlight] = useState('');
  const [hotels, setHotels] = useState({});
  const [hotelId, setHotelId] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
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
        setHotels(uniqueHotels);
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
  // const uniqueValFromArray = (arr, val) => {
  //   return [...new Set(arr.map((e) => e[val]))];
  // };
  const resetHandler = () => {
    setHasTransfer('all');
    setFlight('');
    setHotelId('');
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
            // setSearchCriteria({ ...searchCriteria, date: datePreFormat(e.target.value) });
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
                // setSearchCriteria({ ...searchCriteria, hasTransfer: e.target.value });
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
              value={flight}
              onChange={(e) => {
                setFlight(e.target.value);
                // setSearchCriteria({ ...searchCriteria, flight: e.target.value });
              }}>
              {flightsArr.map((fl) => {
                return (
                  <option key={fl} value={fl}>
                    {fl}
                  </option>
                );
              })}
              <option value="">all</option>
            </select>
          </label>
        )}
        {contacts.length > 0 && (
          <label htmlFor="hotels">
            hotel
            <select name="hotelId" id="hotels" onChange={(e) => setHotelId(e.target.value)}>
              {Object.keys(hotels).map((k) => {
                return (
                  <option key={k} value={k}>
                    {hotels[k]}
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
      <button onClick={resetHandler}>reset</button>
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
