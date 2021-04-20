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
    HotelsService.hotelRating(hotelId, token)
      .then((rating) => setRating(rating))
      .catch(console.log);
  }, []);
  return (
    <div>
      <h3>Rating for hotel {rating?.rating?..hotelId?.name}</h3>
      <div>{hotelId}</div>
      <div>location - {rating?.rating?.location}</div>
      <div>{JSON.stringify(rating)}</div>
    </div>
  );
};
export default HotelRating;
