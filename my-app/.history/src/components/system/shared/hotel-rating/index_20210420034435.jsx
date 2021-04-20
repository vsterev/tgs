import React from 'react';
import { useParams } from 'react-router-dom';

const HotelRating = () => {
  const { hotelId } = useParams();
  return (
    <div>
      <h3>Hotel Rating</h3>
    </div>
  );
};
export default HotelRating;
