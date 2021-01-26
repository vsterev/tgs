import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContactService from '../../../../services/contacts';
import parseCookie from '../../../../utils/parseCookie';
const ArrivalCheck = () => {
  const { date } = useParams();
  const token = parseCookie('tgs-token');
  const [mes, setMes] = useState({});
  useEffect(() => {
    ContactService.checkInCheck(date, token).then(r=>setMes(r)).catch(err=>console.log(err));
  }, []);
  return (<div>
      {JSON.stringify(setMes)}
  </div>);
};
export default ArrivalCheck;
.