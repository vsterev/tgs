import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelsService from '../../../../services/hotels';
import parseCookie from '../../../../utils/parseCookie';
// import HotelsService from '../../../../services/hotels';
const HotelRating = () => {
  const { hotelId } = useParams();
  const [rating, setRating] = useState('');
  useEffect(() => {
    const token = parseCookie('tgs-token');
    HotelsService.hotelRating(hotelId, token).then(console.log).catch(console.log);
  }, []);
  return (
    <div>
      <h3>Hotel Rating</h3>
      <div>{hotelId}</div>
    </div>
  );
};
export default HotelRating;
