import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from './contacts-table.module.css';
import contactService from '../../../../services/contacts';
import parseCookie from '../../../../utils/parseCookie';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const ContactsTable = ({
  contacts,
  date,
  setContacts,
  type,
  setHotelsArr,
  setHotelId,
  setFlightsArr,
  setFlight,
  setTransferArr,
  setHasTransfer,
}) => {
  const history = useHistory();
  const token = parseCookie('tgs-token');
  const [arrChecked, setArrChecked] = useState([]);
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState('12:00');
  const [comment, setComment] = useState('');
  const handleSnackClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setMsg('');
  };
  const temp = contacts.map((el) => el.resId);
  const deselectAll = () => {
    setArrChecked(arrChecked.filter((d) => !temp.includes(d)));
  };
  const selectAll = () => {
    setArrChecked([...new Set([...arrChecked, ...temp])]);
  };
  const uniqueValFromArray = (arr, val) => {
    return [...new Set(arr.map((e) => e[val]))];
  };
  //console.warn(contacts);
  return (
    <React.Fragment>
      {type === 'departure' && (
        <div className={styles.tablehead}>
          <h4 className={styles.chips}>
            Изберете резервациите, за които искате да добавите или промените информацията за трансфера
          </h4>
          <div className={styles.chips}>
            <Chip
              className={styles.chip}
              variant="outlined"
              color="primary"
              avatar={<Avatar>+</Avatar>}
              onClick={selectAll}
              label="select all"
              size="small"
            />
            <Chip
              className={styles.chip}
              variant="outlined"
              color="secondary"
              avatar={<Avatar>-</Avatar>}
              onClick={deselectAll}
              label="deselect all"
              size="small"
            />
          </div>
        </div>
      )}

      <table>
        <thead className={styles.title}>
          <tr>
            <th colSpan={type === 'departure' ? '15' : '11'}>
              {type}s for {date}
            </th>
          </tr>
          {type === 'departure' && (
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
              {/* <th>msg-send</th> */}
              <th>goodbye message id</th>
              <th>select</th>
            </tr>
          )}
          {type === 'arrival' && (
            <tr>
              <th>res. Id</th>
              <th>resort</th>
              <th>hotel</th>
              <th>check-in</th>
              {/* <th>dep-flight</th> */}
              <th>arr-flight</th>
              <th>tourist names</th>
              <th>tourist phone</th>
              <th>transfer</th>
              {/* <th>time</th> */}
              {/* <th>comment</th> */}
              <th>check-out</th>
              <th>dep-flight</th>
              <th>welcome message id</th>
              {/* <th>select</th> */}
            </tr>
          )}
        </thead>
        <tbody>
          {contacts.map((contact, i) => {
            if (type === 'departure') {
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
                  {/* <td>{contact.sendedMsg}</td> */}
                  <td>
                    <Button
                      color="primary"
                      onClick={() =>
                        window.open(
                          `/admin/bulk-sms/message-info/${contact.lastSendMessage}`,
                          'message',
                          'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                        )
                      }>
                      {contact.lastSendMessage}
                    </Button>
                  </td>
                  <td>
                    {!!contact.hasTransfer && (
                      <input
                        type="checkbox"
                        value={contact.resId}
                        checked={arrChecked.includes(contact.resId)}
                        onChange={(e) => {
                          console.log(typeof contact.resId, arrChecked);
                          if (!arrChecked.includes(e.target.value)) {
                            setArrChecked([...arrChecked].concat(e.target.value));
                          } else {
                            setArrChecked(arrChecked.filter((el) => el !== e.target.value));
                          }
                        }}
                      />
                    )}
                  </td>
                </tr>
              );
            } else {
              return (
                <tr key={contact.resId}>
                  {/* <td>{i + 1}</td> */}
                  <td>{contact.resId}</td>
                  <td>{contact.hotelId.resortId.name}</td>
                  <td>{contact.hotelId.name}</td>
                  <td>{contact.checkIn}</td>
                  <td>{contact.flightArrival}</td>
                  <td>{contact.name}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.hasTransfer ? 'yes' : 'no'}</td>
                  {/* <td>{contact.time}</td> */}
                  {/* <td>{contact.comment}</td> */}
                  <td>{contact.checkOut}</td>
                  <td>{contact.flightDeparture}</td>
                  {/* <td>{contact.sendedMsg}</td> */}
                  <td
                  // onClick={() => {
                  //   if (contact.firstSendMessage) {
                  //     window.open(
                  //       `/admin/bulk-sms/message-info/${contact.firstSendMessage}`,
                  //       'message',
                  //       'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                  //     );
                  //   }
                  // }}
                  >
                    {/* {contact.firstSendMessage} */}
                    <Button
                      color="primary"
                      onClick={() => {
                        if (contact.firstSendMessage) {
                          window.open(
                            `/admin/bulk-sms/message-info/${contact.firstSendMessage}`,
                            'message',
                            'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                          );
                        }
                      }}>
                      {contact.firstSendMessage}
                    </Button>
                  </td>
                  {/* <td>
                    <input
                      type="checkbox"
                      value={contact.resId}
                      checked={arrChecked.includes(contact.resId)}
                      onChange={(e) => {
                        if (!arrChecked.includes(e.target.value)) {
                          setArrChecked(arrChecked.concat(e.target.value));
                        } else {
                          setArrChecked(arrChecked.filter((el) => el !== e.target.value));
                        }
                      }}
                    />
                  </td> */}
                </tr>
              );
            }
          })}
        </tbody>
      </table>
      {type === 'departure' && (
        <React.Fragment>
          {/* {!!msg && <div>t {msg}</div>} */}
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            open={!!msg}
            autoHideDuration={4000}
            onClose={handleSnackClose}
            message={msg}
            action={
              <React.Fragment>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackClose}>
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <h4>Въведете час и коментар към трансфера за маркираните резервации</h4>
          <form
            className={styles.infoset}
            onSubmit={(e) => {
              e.preventDefault();
              contactService
                .updateMany({ reservations: arrChecked, time, comment }, token)
                .then((rs) => {
                  console.warn('--- update many');
                  setMsg(rs);
                })
                .then(async () => {
                  console.warn('--- get latest data from mongo');
                  const result = await contactService.checkOut({ date, hasTransfer: 'all' }, token);
                  console.log(result);

                  return result;
                })
                .then(async (cns) => {
                  console.warn('--- before set contacts');
                  console.log(cns);
                  setContacts(cns);
                  const temp = await uniqueValFromArray(cns, 'flightDeparture');
                  setFlightsArr(temp);
                  setTransferArr(uniqueValFromArray(cns, 'hasTransfer'));
                  const hotels = cns.map((rs) => rs.hotelId);
                  const uniqueHotels = hotels.reduce((acc, curr) => {
                    acc[curr._id] = curr.name;
                    return acc;
                  }, {});
                  setHotelsArr(uniqueHotels);
                  setFlight('');
                  setHotelId('');
                  setHasTransfer('all');
                })
                .then(() => {
                  setTime('12:00');
                  setComment('');
                  deselectAll();
                })
                .catch((err) => console.error(err));
              // console.log(e.target.time.value, e.target.comment.value, arrChecked);
            }}>
            {/* <label htmlFor="time">
              pick-up time
              <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </label> */}

            {/* <label htmlFor="comment">
              comment for transfer
              <textarea
                rows="3"
                cols="50"
                id="comment"
                value={comment}
                name="comment"
                onChange={(e) => setComment(e.target.value)}
              />
            </label> */}
            <TextField
              id="standard-basic"
              label="time"
              name="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <TextField
              id="standard-basic"
              label="comment for transfer"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              multiline
            />
            <Button
              // variant="outlined"
              variant="contained"
              size="small"
              color="primary"
              type="submit"
              disabled={!comment || !time || arrChecked.length === 0}>
              set transfer info
            </Button>
          </form>
          {/* <button onClick={() => console.log(arrChecked)}>view Array</button>
          <div onClick={deselectAll}>deselect all</div>
          <div onClick={selectAll}>select all</div> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default ContactsTable;
