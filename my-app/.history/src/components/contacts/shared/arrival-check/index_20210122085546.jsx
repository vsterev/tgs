import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';
const ArrivalCheck = () => {
  const { date } = useParams();
  const token = parseCookie('tgs-token');
  const [mes, setMes] = useState({});
  useEffect(() => console.log(token), []);
  return <div>vasko</div>;
};
export default ArrivalCheck;
