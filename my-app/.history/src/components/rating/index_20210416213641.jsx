import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
import voteService from '../../services/vote';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ratinStyles from './rating.module.css';
import TextField from '@material-ui/core/TextField';

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
    if (!rating.staff) {
      setErr('Please rate the staff!');
      return;
    }
    console.log('rating', rating);
    // voteService
    //   .userVote(rating)
    //   .then((a) => {
    //     console.log('а', a);
    //     // if (a.err) {
    //     //   setErr('You have already voted your holiday');
    //     //   return;
    //     // }
    //     history.push('/thanks');
    //   })
    //   .catch(console.log);
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
            className={ratinStyles.formRating}
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
            <button>submit</button>
          </form>
          {/* {JSON.stringify(resInfo)} */}
        </div>
      )}
    </div>
  );
};
export default UserRating;
