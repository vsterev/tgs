import React, { useState } from 'react';
import styles from './contacts-table.module.css';
const ContactsTable = ({ contacts, date }) => {
  const [arrChecked, setArrChecked] = useState([]);
  // const[comment, setComment] = useState('');
  const temp = contacts.map((el) => el.resId); //ne raboti prawilno
  const deselectAll = () => {
    console.log('temp', temp, 'arrChecked', arrChecked);
    setArrChecked(temp.filter((d) => !arrChecked.includes(d)));
  };
  const selectAll = () => {
    setArrChecked([...new Set([...arrChecked, ...temp])]);
  };
  return (
    <React.Fragment>
      <h2>Изберете резервациите, за да определите час на вземане от хотела.</h2>
      <table>
        <thead className={styles.title}>
          <tr>
            <th colSpan={14}> tourist for {date}</th>
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
            <th>msg-send</th>
            <th>select</th>
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
                <td>{contact.sendedMsg}</td>
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
          })}
        </tbody>
      </table>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e.target.time.value, e.target.comment.value);
        }}>
        <label htmlFor="time">
          pick-up time
          <input type="time" id="time" name="time" />
        </label>
        <label htmlFor="comment">
          comment for transfer
          <textarea rows="3" id="comment" name="comment" />
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
