import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
import voteService from '../../services/vote';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import styles from './rating.module.css';

const UserRating = () => {
  const history = useHistory();
  const { resId } = useParams();
  const [err, setErr] = useState('');
  const [resInfo, setResInfo] = useState('empty');
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
  const marks = [
    { value: 1, label: '+1' },
    { value: 5, label: '+5' },
    { value: 10, label: '+10' },
  ];
  useEffect(() => {
    contactService.reservationInfo(resId).then((res) => {
      console.log(res);
      if (!res.contact) {
        setErr('No reservation with this number');
        // history.push({ pathname: '/user-vote/error', state: { err: 'No reservation with this number' } });
        history.push({ pathname: '/user-vote/error', state: { err } });
        return;
      }
      if (res.userVoted) {
        setErr('You have already voted this reservation');
        // history.push({ pathname: '/user-vote/error', state: { err: 'You have already voted this reservation' } });
        history.push({ pathname: '/user-vote/error', state: { err } });
        return;
      }
      setResInfo(res.contact);
      setRating({ ...rating, resId: resId, hotelId: res?.contact?.hotelId?._id.toString() });
    });
  }, [err]);
  const submitHandler = (e) => {
    e.preventDefault();
    voteService
      .userVote(rating)
      .then((a) => {
        console.log('а', a);
        // if (a.err) {
        //   setErr('You have already voted your holiday');
        //   return;
        // }
        history.push('/thanks');
      })
      .catch(console.log);
  };
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      {resInfo === 'empty' ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <h3> Dear {resInfo?.name} please send your feedback, your vote is inportant for us.</h3>
          <div>reservetion: {resId}</div>
          <div>
            hotel: {resInfo?.hotelId?.name} / {resInfo?.hotelId?.resortId?.name}
          </div>

          <form
            className={styles.formRating}
            onSubmit={(e) => {
              submitHandler(e);
            }}>
            <Typography id="discrete-slider" gutterBottom>
              Temperature
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(e) => setRating({ ...rating, staff: e.target.value })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={10}
            />
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
