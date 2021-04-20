import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HotelsService from '../../../../services/hotels';
import parseCookie from '../../../../utils/parseCookie';
import styles from './hotel-rating.module.css';
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
    <div className={styles.hotelRatingWrapper}>
      <h3>Rating for hotel - {rating?.rating?.hotelId?.name}</h3>
      <h4>
        average rate - {rating?.averagRate}/{rating?.maxRate}
      </h4>
      <div>location - {rating?.rating?.location}/10</div>
      <div>cleanliness - {rating?.rating?.cleanliness}/10</div>
      <div>comfort - {rating?.rating?.comfort}/10</div>
      <div>staff - {rating?.rating?.staff}/10</div>
      <div>food - {rating?.rating?.food}/10</div>
      <div>value foe money - {rating?.rating?.value}/10</div>
      <div>
        comments:
        <table>
          <thead>
            <tr>
              <th>comment</th>
              <th>tourist</th>
              <th>check-in</th>
              <th>reservation</th>
            </tr>
          </thead>
          <tbody>
            {rating?.rating?.comments.map((res, i) => {
              return (
                <tr key={i}>
                  <td>{res.comment}</td>
                  <td>{res.resId.name}</td>
                  <td>{res.resId.checkIn}</td>
                  <td>{res.resId._id}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default HotelRating;
