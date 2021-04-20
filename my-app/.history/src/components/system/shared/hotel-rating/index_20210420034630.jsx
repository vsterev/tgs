import React from 'react';
import { useParams } from 'react-router-dom';
import parsecookie from '../../../../utils/parseCookie';

const HotelRating = () => {
  const { hotelId } = useParams();
  const token = parsecookie['tgs-token'];
  return (
    <div>
      <h3>Hotel Rating</h3>
      <div>{hotelId}</div>
    </div>
  );
};
export default HotelRating;
