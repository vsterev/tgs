import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
const UserRating = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState('null');
  const [rating, setRating] = useState({ hotelComment: '', staff: '', value: '' });
  useEffect(() => {
    contactService.reservationInfo(resId).then((res) => {
      console.log(res);
      setResInfo(res.contact);
    });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(rating);
  };
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      <h3> Dear {resInfo.name} please send your feedback, your vote is inportant for us.</h3>
      <div>reservetion: {resId}</div>
      <div>
        hotel: {resInfo?.hotelId?.name} / {resInfo?.hotelId?.resortId?.name}
      </div>
      <form
        onSubmit={(e) => {
          submitHandler(e);
        }}>
        <label htmlFor="hotelComment">
          comment to hotel
          <input
            type="text"
            value={rating.hotelComment}
            name="hotelComment"
            onChange={(e) => setRating({ ...rating, hotelComment: e.target.value })}
          />
        </label>
        <label htmlFor="staff">
          staff
          <input
            type="text"
            value={rating.staff}
            name="staff"
            onChange={(e) => setRating({ ...rating, staff: e.target.value })}
          />
        </label>
        <label htmlFor="value">
          value for money
          <input
            type="text"
            value={rating.value}
            name="value"
            onChange={(e) => setRating({ ...rating, value: e.target.value })}
          />
        </label>
        <button>submit</button>
      </form>
      {JSON.stringify(resInfo)}
    </div>
  );
};
export default UserRating;
