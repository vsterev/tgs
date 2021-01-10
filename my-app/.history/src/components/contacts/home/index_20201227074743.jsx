import React, { useEffect, useState } from 'react';
import styles from './home.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';
import ContactsForm from '../shared/contacts-form';
import ContactsTable from '../shared/contacts-table';
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
        test();
        async function test() {
          // console.log(result);
          const temp = await uniqueValFromArray(result, 'flightDeparture');
          setFlightsArr(temp);
          // console.log(temp);
        }
        setTransferArr(uniqueValFromArray(result, 'hasTransfer'));
        const hotels = result.map((rs) => rs.hotelId);
        const uniqueHotels = hotels.reduce((acc, curr) => {
          acc[curr._id] = curr.name;
          return acc;
        }, {});
        setHotelsArr(uniqueHotels);
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
    arr.map((el) => (el.checked = false));
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

      <ContactsForm
        transferArr={transferArr}
        setHasTransfer={setHasTransfer}
        hasTransfer={hasTransfer}
        flightsArr={flightsArr}
        setFlight={setFlight}
        flight={flight}
        hotelsArr={hotelsArr}
        setHotelId={setHotelId}
        hotelId={hotelId}
        submitHandler={submitHandler}
        setDate={setDate}
        datePreFormat={datePreFormat}
        contacts={contacts}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
      {/* <form onSubmit={submitHandler}> */}

      {/* <label htmlFor="flight">flight</label>
        <input
        type="text"
        placeholder="flight number"
        // name="search"
        ref={flight}
        // value={search}
        // onChange={(e) => console.log(e.target.value)}
      /> */}
      {/* 
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
          }} */}
      {/* /> */}
      {/* {contacts.length !== 0 && (
          <ContactsForm
            transferArr={transferArr}
            setHasTransfer={setHasTransfer}
            hasTransfer={hasTransfer}
            flightsArr={flightsArr}
            setFlight={setFlight}
            flight={flight}
            hotelsArr={hotelsArr}
            setHotelId={setHotelId}
            hotelId={hotelId}
          />
        )} */}
      {/* {flightsArr.length !== 0 && (
      
        )} */}
      {/* {contacts.length > 0 && (
         
        )} */}
      {/* <button type="submit" disabled={isDisabled}>
          Search
        </button>
      </form> */}
      {contacts.length !== 0 && <ContactsTable contacts={contacts} date={date} setContacts={setContacts} />}
    </div>
  );
};
export default HomeContacts;
