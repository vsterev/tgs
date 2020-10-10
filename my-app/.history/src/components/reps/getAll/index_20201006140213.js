import React, { useState, useEffect } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';

const RepsAll = () => {
  const token = parseCookie('tgs-token');
  // console.log(token);
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
  function clickHandler() {
    // repsService
    //   .getAll(token)
    //   .then((reps) => console.log(reps))
    //   .catch((e) => console.error(e));
  }
  return (
    <React.Fragment>
      <h2>All Reps</h2>
      {reps.map((rep, k) => {
        return (
          <div key={k}>
            {rep.firstName} {rep.familyName} - {rep.phone}
          </div>
        );
      })}
      {err && <div>{err}</div>}
    </React.Fragment>
  );
};
export default RepsAll;
