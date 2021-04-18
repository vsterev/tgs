import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
import voteService from '../../services/vote';
const UserRating = () => {
  const history = useHistory();
  const { resId } = useParams();
  const [err, setErr] = useState('');
  const [resInfo, setResInfo] = useState('');
  const [rating, setRating] = useState({
    resId: '',
    hotelId: '',
    hotelComment: '',
    staff: '5',
    cleanliness: '5',
    value: '5',
    comfort: '5',
    location: '5',
    food: '5',
  });
  useEffect(() => {
    contactService.reservationInfo(resId).then((res) => {
      if (!res) {
        setErr('No reservation with this number');
      }
      setResInfo(res.contact);
      setRating({ ...rating, resId: resId, hotelId: res?.contact?.hotelId?._id.toString() });
    });
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    voteService
      .userVote(rating)
      .then((a) => {
        console.log('а', a);
        if (!a) {
          setErr('You have already voted your holiday');
        }
        history.push('/thanks');
      })
      .catch(console.log);
  };
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      {resInfo === null ? (
        <div>No reservation with this number</div>
      ) : (
        <div>
          <h3> Dear {resInfo?.name} please send your feedback, your vote is inportant for us.</h3>
          <div>reservetion: {resId}</div>
          <div>
            hotel: {resInfo?.hotelId?.name} / {resInfo?.hotelId?.resortId?.name}
          </div>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}>
            <label htmlFor="staff">staff</label>
            <select
              id="staff"
              name="staff"
              onChange={(e) => setRating({ ...rating, staff: e.target.value })}
              defaultValue={rating.staff}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="cleanliness">cleanliness</label>
            <select
              id="cleanliness"
              onChange={(e) => setRating({ ...rating, cleanliness: e.target.value })}
              defaultValue={rating.cleanliness}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="value">value for money</label>
            <select
              id="value"
              onChange={(e) => setRating({ ...rating, value: e.target.value })}
              defaultValue={rating.value}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="comfort">comfort</label>
            <select
              id="comfort"
              onChange={(e) => setRating({ ...rating, comfort: e.target.value })}
              defaultValue={rating.comfort}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="location">location</label>
            <select
              id="location"
              onChange={(e) => setRating({ ...rating, location: e.target.value })}
              defaultValue={rating.location}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="food">food</label>
            <select
              id="food"
              onChange={(e) => setRating({ ...rating, food: e.target.value })}
              defaultValue={rating.food}>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
            <label htmlFor="hotelComment">
              comment to hotel
              <textarea
                value={rating.hotelComment}
                name="hotelComment"
                onChange={(e) => setRating({ ...rating, hotelComment: e.target.value })}
              />
            </label>
            <button>submit</button>
          </form>
          {/* {JSON.stringify(resInfo)} */}
        </div>
      )}
    </div>
  );
};
export default UserRating;
