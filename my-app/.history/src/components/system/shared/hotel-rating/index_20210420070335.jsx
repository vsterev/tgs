import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HotelsService from '../../../../services/hotels';
import parseCookie from '../../../../utils/parseCookie';
// import HotelsService from '../../../../services/hotels';
const HotelRating = () => {
  const { hotelId } = useParams();
  useEffect(() => {
    HotelsService.hotelRating(hotelId, token).then(console.log).catch(console.log);
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
