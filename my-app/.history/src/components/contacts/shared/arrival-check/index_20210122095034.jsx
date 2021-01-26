import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactService from '../../../../services/contacts';
import parseCookie from '../../../../utils/parseCookie';
const ArrivalCheck = () => {
  const { date } = useParams();
  const token = parseCookie('tgs-token');
  const [mes, setMes] = useState({});
  useEffect(() => {
    ContactService.checkInCheck(date, token)
      .then((r) => setMes(r))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      {JSON.stringify(mes)}
      <h2>info about arrivals messages on {date}</h2>
      <p>number of all bookings: {mes.allContacts} </p>
      <p>number of sended messages: {mes.contactMessageSended} </p>
      <h3>founded troubles with contacts </h3>
      <p>
        contacts without attached phones:{' '}
        {Object.entries(mes?.noPhones)
          .map((hotelInfo) => hotelInfo[1])
          .join(', ')}
      </p>
      {/* <p>hotels without attached representative: {mes.noRepsAdded?.join(', ')}</p> */}
    </div>
  );
};
export default ArrivalCheck;
