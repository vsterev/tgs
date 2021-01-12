import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from './contacts-table.module.css';
import contactService from '../../../../services/contacts';
import parseCookie from '../../../../utils/parseCookie';
import PopupMessage from '../popup-message';
const ContactsTable = ({ contacts, date, setContacts, type }) => {
  const history = useHistory();
  const token = parseCookie('tgs-token');
  const [arrChecked, setArrChecked] = useState([]);
  const [msg, setMsg] = useState('');
  const [time, setTime] = useState('');
  const [comment, setComment] = useState('');
  const temp = contacts.map((el) => el.resId);
  const deselectAll = () => {
    setArrChecked(arrChecked.filter((d) => !temp.includes(d)));
  };
  const selectAll = () => {
    setArrChecked([...new Set([...arrChecked, ...temp])]);
  };
  //console.warn(contacts);
  return (
    <React.Fragment>
      <h2>Изберете резервациите, за да определите час на вземане от хотела.</h2>
      <table>
        <thead className={styles.title}>
          <tr>
            <th colSpan={15}>
              {' '}
              {type} for {date}
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
              <th>departure flight</th>
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
                  <td
                    onClick={() =>
                      window.open(
                        `/admin/bulk-sms/message-info/${contact.firstSendMessage}`,
                        'message',
                        'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                      )
                    }>
                    {contact.firstSendMessage}
                  </td>
                  <td>
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
                    onClick={() =>
                      window.open(
                        `/admin/bulk-sms/message-info/${contact.firstSendMessage}`,
                        'message',
                        'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=600, height=500, top=100, left=300'
                      )
                    }>
                    {contact.firstSendMessage}
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
      {!!msg && <div>{msg}</div>}
      <form
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
            .then((cns) => {
              console.warn('--- before set contacts');
              console.log(cns);
              setContacts(cns);
            })
            .then(() => {
              setTime('');
              setComment('');
              deselectAll();
            })
            .catch((err) => console.error(err));
          console.log(e.target.time.value, e.target.comment.value, arrChecked);
        }}>
        <label htmlFor="time">
          pick-up time
          <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </label>
        <label htmlFor="comment">
          comment for transfer
          <textarea
            rows="3"
            cols="50"
            id="comment"
            value={comment}
            name="comment"
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
      <button onClick={() => console.log(arrChecked)}>view Array</button>
      <div onClick={deselectAll}>deselect all</div>
      <div onClick={selectAll}>select all</div>
    </React.Fragment>
  );
};
export default ContactsTable;
