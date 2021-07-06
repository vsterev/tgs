import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
import voteService from '../../services/vote';
import Button from '@material-ui/core/Button';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ratingStyles from './rating.module.css';
import TextField from '@material-ui/core/TextField';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
const UserRating = () => {
  const history = useHistory();
  const { resId } = useParams();
  const [err, setErr] = useState('');
  const [resInfo, setResInfo] = useState('empty');
  const [rating, setRating] = useState({
    resId: '',
    hotelId: '',
    hotelComment: '',
    staff: '',
    cleanliness: '',
    value: '',
    comfort: '',
    location: '',
    food: '',
  });
  const marks = [
    { value: 1, label: '+1' },
    { value: 5, label: '+5' },
    { value: 10, label: '+10' },
  ];
  useEffect(() => {
    let isSubscribed = true;
    contactService
      .reservationInfo(resId)
      .then((res) => {
        console.log({ res });
        if (!res.contact & !isSubscribed) {
          setErr('No reservation with this number');
          // history.push({ pathname: '/user-vote/error', state: { err: 'No reservation with this number' } });
          history.push({ pathname: '/user-vote/error', state: { err } });
          return;
        }
        if (res.userVoted & !isSubscribed) {
          setErr('You have already voted this reservation');
          // history.push({ pathname: '/user-vote/error', state: { err: 'You have already voted this reservation' } });
          history.push({ pathname: '/user-vote/error', state: { err } });
          return;
        }
        if (isSubscribed) {
          setResInfo(res.contact);
          setRating({ ...rating, resId: resId, hotelId: res?.contact?.hotelId?._id.toString() });
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          setErr(err);
        }
      });
    return () => {
      isSubscribed = false;
    };
  }, [err]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (!rating.staff) {
      setErr('Please rate the staff!');
      return;
    } else if (!rating.cleanliness) {
      setErr('Please rate the cleanliness!');
      return;
    } else if (!rating.value) {
      setErr('Please rate value of hotel!');
      return;
    } else if (!rating.comfort) {
      setErr('Please rate comfort!');
      return;
    } else if (!rating.location) {
      setErr('Please rate location!');
      return;
    } else if (!rating.food) {
      setErr('Please rate food!');
      return;
    }
    // { "resId":"504352", "hotelId":"1021","hotelComment": "test za comment", "staff": "5", "value": "8","cleanliness":"6", "comfort":"8", "food":"6", "location":"7" }
    voteService
      .userVote({
        resId,
        hotelId: rating?.hotelId,
        hotelComment: rating?.hotelComment,
        staff: rating?.staff,
        value: rating?.value,
        cleanliness: rating?.cleanliness,
        comfort: rating?.comfort,
        food: rating?.food,
        location: rating?.location,
      })
      .then((result) => {
        if (!result.err) {
          history.push({ pathname: '/user-vote/thanks', state: { name: resInfo.name } });
          return;
        }
        console.log('Ne moje da se glasuwa', result.err);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={ratingStyles.ratingWrapper}>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      {resInfo === 'empty' ? (
        <div>Loading ... </div>
      ) : (
        <div>
          <selection className={ratingStyles.rating}>
            <div>
              <HowToVoteIcon fontSize="large" color="primary" />
            </div>
            <h3>
              Dear {resInfo?.name} DMC Solvex kindly ask you to send your feedback, your vote is inportant for us.
            </h3>
            <div>your booking details</div>
            <div>reservetion number: {resId}</div>
            <div>
              hotel: {resInfo?.hotelId?.name} / {resInfo?.hotelId?.resortId?.name}
            </div>
          </selection>
          <form
            className={ratingStyles.formRating}
            onSubmit={(e) => {
              submitHandler(e);
            }}>
            <Typography id="discrete-slider" gutterBottom>
              Staff {rating?.staff}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, staff: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={10}
            />
            <Typography id="discrete-slider" gutterBottom>
              Cleanliness {rating?.cleanliness}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, cleanliness: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={10}
            />
            <Typography id="discrete-slider" gutterBottom>
              Value for money {rating?.value}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, value: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={10}
            />
            <Typography id="discrete-slider" gutterBottom>
              Comfort {rating?.comfort}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, comfort: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={10}
            />
            <Typography id="discrete-slider" gutterBottom>
              Location {rating?.location}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, location: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={true}
              min={1}
              max={10}
            />
            <Typography id="discrete-slider" gutterBottom>
              Food {rating?.food}
            </Typography>
            <Slider
              defaultValue={5}
              // getAriaValueText={(e) => setRating({ ...rating, staff: e })}
              onChange={(event, e) => setRating({ ...rating, food: e })}
              // value={rating?.staff}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={10}
            />
            {/* <label htmlFor="staff">staff</label>
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
            </select> */}
            <TextField
              id="outlined-multiline-static"
              label="Comment"
              multiline
              rows={4}
              // defaultValue="Default Value"
              variant="outlined"
              onChange={(e) => setRating({ ...rating, hotelComment: e.target.value })}
              className={ratingStyles.rating}
            />
            {/* <label htmlFor="hotelComment">
              comment to hotel
              <textarea
                value={rating.hotelComment}
                name="hotelComment"
                onChange={(e) => setRating({ ...rating, hotelComment: e.target.value })}
              />
            </label> */}
            {err && <div>{err}</div>}
            <Button type="submit" fullWidth variant="contained" color="primary" className={ratingStyles.rating}>
              Rate it
            </Button>
            {/* <button>submit</button> */}
          </form>
          {/* {JSON.stringify(resInfo)} */}
        </div>
      )}
    </div>
  );
};
export default UserRating;
