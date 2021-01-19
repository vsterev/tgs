import React, { useState } from 'react';
import styles from './arrivalByDate.module.css';
import parseCookie from '../../../utils/parseCookie';
import contactsService from '../../../services/contacts';
import ContactsForm from '../shared/contacts-form';
import ContactsTable from '../shared/contacts-table';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const ArrivalByDate = () => {
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
  const [searchClicked, setSearchClicked] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(contacts);
    contactsService
      .checkIn({ date }, token)
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
        setSearchClicked(true);
        setOpenSnack(true);
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
    <div className={styles.arrivalwrapper}>
      <h2 className={styles.arrival}>Arrival bookings by date</h2>
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
        datePreFormat={datePreFormat}
        date={date}
        setDate={setDate}
        contacts={contacts}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
        type="arrival"
        setSearchClicked={setSearchClicked}
        setContacts={setContacts}
      />
      {searchClicked && <div>search return - {contacts.length} results</div>}
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        message={`search return - ${contacts.length} results`}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {contacts.length !== 0 && (
        <ContactsTable contacts={contacts} date={date} setContacts={setContacts} type="arrival" />
      )}
    </div>
  );
};
export default ArrivalByDate;
