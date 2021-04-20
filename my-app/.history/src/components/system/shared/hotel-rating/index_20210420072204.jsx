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
      <h3>Rating for hotel {rating?.rating?.hotelId?.name}</h3>
      <h4>
        {rating?.rating?.averageRate}/{rating?.rating?.maxRate}
      </h4>
      <div>{hotelId}</div>
      <div>location - {rating?.rating?.location}/10</div>
      <div>cleanliness - {rating?.rating?.cleanliness}/10</div>
      <div>comfort - {rating?.rating?.comfort}/10</div>
      <div>staff - {rating?.rating?.staff}/10</div>
      <div>food - {rating?.rating?.food}/10</div>
      <div>value foe money - {rating?.rating?.value}/10</div>
      <div>
        comments:<textarea>{rating?.rating?.comments}</textarea>
      </div>
    </div>
  );
};
export default HotelRating;
