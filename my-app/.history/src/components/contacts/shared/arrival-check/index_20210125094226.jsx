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
      {!!mes && <div>Loading...</div>}
      <h2>info about arrivals messages on {date}</h2>
      <p>number of all bookings: {mes.allContacts} </p>
      <p>
        number of messages that will be send:{' '}
        {+mes.allContacts?.length -
          +mes.contactMessageSended?.length -
          +mes.noPhones?.length -
          +mes.noRepsAdded?.length}{' '}
      </p>
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
export default ArrivalCheck;
