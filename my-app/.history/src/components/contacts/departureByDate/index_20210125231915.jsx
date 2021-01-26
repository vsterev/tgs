import React, { useEffect, useState } from 'react';
import styles from './departureByDate.module.css';
import parseCookie from '../../../utils/parseCookie';
import ContactsService from '../../../services/contacts';
import ContactsForm from '../shared/contacts-form';
import ContactsTable from '../shared/contacts-table';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { useHistory } from 'react-router-dom';

const DepartureByDate = (props) => {
  const history = useHistory();
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
  const [openSnack, setOpenSnack] = useState(false);
  const [messageInfo, setMessagInfo] = useState('');
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };
  // const flight = React.createRef();
  let transfer = '';
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(contacts);
    ContactsService.checkOut({ date, hasTransfer, flight, hotelId }, token)
      // .checkOut(searchCriteria, token)
      .then((result) => {
        setContacts(sortHotels(result));
        test();
        async function test() {
          const temp = await uniqueValFromArray(result, 'flightDeparture');
          setFlightsArr(temp);
        }
        setTransferArr(uniqueValFromArray(result, 'hasTransfer'));
        const hotels = result.map((rs) => rs.hotelId);
        const uniqueHotels = hotels.reduce((acc, curr) => {
          acc[curr._id] = curr.name;
          return acc;
        }, {});
        setHotelsArr(uniqueHotels);
        setOpenSnack(true);
        setMessagInfo(`search return - ${result.length} results`);
      })
      .catch((e) => console.log(e));
  };
  const sendMessageHandler = () => {
    ContactsService.goodByeSendMessage(date, token)
      .then((r) => {
        console.log(r);
        setMessagInfo(
          `sended to ${r?.dataSended} contacts, errors in ${
            r?.noPhones.length + r?.noRepsAdded.length
          } contacts, for more info view email`
        );
      })
      .then(() => {
        return ContactsService.checkOut({ date }, token);
      })
      .then((result) => {
        console.log('result', result);
        setContacts(sortHotels(result));
        console.log(contacts);
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
        setOpenSnack(true);
      })
      .catch((err) => console.log(err));
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
    <div className={styles.departurewrapper}>
      <h2 className={styles.departure}>Departures by date</h2>
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
        type="departure"
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        message={messageInfo}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
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
      {contacts.length !== 0 && (
        <React.Fragment>
          <ContactsTable
            contacts={contacts}
            date={date}
            setContacts={setContacts}
            type="departure"
            setHotelsArr={setHotelsArr}
            setHotelId={setHotelId}
            setFlightsArr={setFlightsArr}
            setFlight={setFlight}
            setTransferArr={setTransferArr}
            setHasTransfer={setHasTransfer}
          />

          <div className={styles.btns}>
            <Button variant="outlined" color="primary" onClick={history.goBack} startIcon={<ArrowBackIosIcon />}>
              back
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                window.open(
                  `/admin/contacts/departure/check/${date}`,
                  'message',
                  'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                )
              }>
              errors check
            </Button>
            <Button variant="contained" color="primary" onClick={sendMessageHandler} endIcon={<SendIcon />}>
              send messages
            </Button>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default DepartureByDate;
