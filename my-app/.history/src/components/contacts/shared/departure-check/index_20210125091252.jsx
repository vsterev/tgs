import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactService from '../../../../services/contacts';
import parseCookie from '../../../../utils/parseCookie';
const DepartureCheck = () => {
  const { date } = useParams();
  const token = parseCookie('tgs-token');
  const [mes, setMes] = useState({});
  useEffect(() => {
    ContactService.checkOutCheck(date, token)
      .then((r) => setMes(r))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div>
      <h2>info about departures messages on {date}</h2>
      <p>number of all bookings: {mes.allContacts} </p>
      <p>number of messages tht will be send: {mes.contactMessageSended} </p>
      <h3>founded troubles with contacts </h3>
      <p>
        contacts without attached phones: {mes.noPhones?.length > 0 ? mes.noPhones?.join(', ') : mes.noPhones?.length}
      </p>
      <p>
        hotels without attached representative:{' '}
        {mes.noRepsAdded &&
          Object.entries(mes.noRepsAdded)
            .map((el) => el[1])
            .join(', ')}
      </p>
    </div>
  );
};
export default DepartureCheck;
