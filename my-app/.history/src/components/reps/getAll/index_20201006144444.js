import React, { useState, useEffect } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
function getHotelsByReps(e) {
  // const [repHotels, SetRepHotels] = [];
  // repsService
  //   .getHotelsByReps(repsId, token)
  //   .then((hot) => console.log(hot))
  //   .catch((e) => console.log(e));
  // return repHotels;

  console.log(e);
}
const RepsAll = () => {
  const token = parseCookie('tgs-token');
  const [reps, setReps] = useState([]);
  const [err, setErr] = useState('');

  useEffect(() => {
    repsService
      .getAll(token)
      .then((result) => {
        if (!result.status) {
          setErr(result.msg);
          return;
        }
        setReps(result.reps);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <React.Fragment>
      <h2>All Reps</h2>
      {reps.map((rep, k) => {
        return (
          <div key={k}>
            {rep.firstName} {rep.familyName} - {rep.phone}
            {/* {rep.hotels.map((hotel, i) => (
              <div key={i}>{hotel.name}</div>
            ))} */}
            <button onClick={getHotelsByReps(() => rep.phone)}>view hotels</button>
          </div>
        );
      })}
      {err && <div>{err}</div>}
    </React.Fragment>
  );
};
export default RepsAll;
