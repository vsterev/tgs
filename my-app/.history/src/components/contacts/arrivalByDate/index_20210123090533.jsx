import React, { useState, useEffect } from 'react';
import styles from './arrivalByDate.module.css';
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
  const [openSnack, setOpenSnack] = useState(false);
  const [sendedInfo, setSendedInfo] = useState({});
  const history = useHistory();
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(contacts);
    getContacts(date, token);
  };
  const sendMessageHandler = () => {
    ContactsService.welcomeSendMessage(date, token)
      .then((r) => {
        console.log(r);
        setSendedInfo(r);
        test();
        async function test() {
          const temp = await getContacts(date, token);
        }
      })
      .catch((err) => console.log(err));
  };
  function getContacts(date, token) {
    return ContactsService.checkIn({ date }, token)
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
        setOpenSnack(true);
      })
      .catch((e) => console.log(e));
  }

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
      <h2 className={styles.arrival}>Arrivals by date</h2>
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
        setContacts={setContacts}
      />
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={openSnack}
        autoHideDuration={4000}
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
        <div>
          <ContactsTable contacts={contacts} date={date} setContacts={setContacts} type="arrival" />
          <div className={styles.btns}>
            <Button variant="outlined" color="primary" onClick={history.goBack} startIcon={<ArrowBackIosIcon />}>
              back
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() =>
                window.open(
                  `/admin/contacts/arrival/check/${date}`,
                  'message',
                  'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                )
              }>
              check contacts
            </Button>
            <Button variant="contained" color="primary" onClick={sendMessageHandler} endIcon={<SendIcon />}>
              send messages
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ArrivalByDate;
