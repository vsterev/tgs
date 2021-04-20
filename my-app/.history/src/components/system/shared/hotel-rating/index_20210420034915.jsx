import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';

const HotelRating = () => {
  const { hotelId } = useParams();
  useEffect(() => {
    const token = parseCookie('tgs-token');
  }, []);
  return (
    <div>
      <h3>Hotel Rating</h3>
      <div>{hotelId}</div>
    </div>
  );
};
export default HotelRating;
