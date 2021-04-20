import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import parseCookie from '../../../../utils/parseCookie';

const HotelRating = () => {
  const { hotelId } = useParams();
  const token = parseCookie('tgs-token');
  useEffect(() => {}, []);
  return (
    <div>
      <h3>Hotel Rating</h3>
      <div>
        {hotelId}, {token}
      </div>
    </div>
  );
};
export default HotelRating;
