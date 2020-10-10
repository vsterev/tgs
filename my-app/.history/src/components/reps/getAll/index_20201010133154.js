import React, { useState, useEffect } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import Hotels from './shared/hotels';
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
            <Hotels hotels={rep.hotels} />
          </div>
        );
      })}
      {err && (
        <div>
          {err.name},{err.message}
        </div>
      )}
    </React.Fragment>
  );
};
export default RepsAll;
