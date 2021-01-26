import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';
const ArrivalCheck = () => {
  const { messageId } = useParams();
  const token = parseCookie('tgs-token');
  return <div>vasko</div>;
};
export default ArrivalCheck;
