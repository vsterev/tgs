import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import Hotels from './shared/hotels';
import SearchRep from './shared/searchRep';

const RepsAll = () => {
  const token = parseCookie('tgs-token');
  const [reps, setReps] = useState([]);
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);
  function reduced(rep) {
    rep.hotels.reduce((acc, curr) => {
      acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr.name];
      return acc;
    }, {});
    return [...Object.entries(reduced)].sort((a, b) => a[0].localeCompare(b[0]));
  }

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
      <Link to="/admin/reps/add-rep">add new Rep</Link>
      <h2>All Reps</h2>
      <SearchRep token={token} setReps={setReps} setErr={setErr} reps={reps} />
      {reps.map((rep, k) => {
        return (
          <div key={k}>
            <div onClick={() => setVisible(!visible)}>
              {rep.firstName} {rep.familyName} - {rep.phone} - {rep.email}
            </div>
            <Link to={`/admin/reps/edit-rep/${rep._id}`}>edit rep</Link>
            {
              visible && console.log()
              // reduced(rep).map((info, i) => {
              //   const resort = info[0];
              //   const hotels = info[1];
              //   return (
              //     <div key={i}>
              //       <div>
              //         {resort} - {hotels.length} hotels
              //       </div>
              //       {hotels.map((hotel, ind) => (
              //         <div key={ind}>{hotel}</div>
              //       ))}
              //     </div>
              //   );
            }
            )}
            {visible && <Link to={`/admin/reps/add-hotel/${rep._id}`}>edit hotels</Link>}
            {/* <Hotels hotels={rep.hotels} repId={rep._id} /> */}
          </div>
        );
      })}
      {err && (
        <div>
          {err.name} - {err.message}
        </div>
      )}
      {/* {JSON.stringify(reps)} */}
    </React.Fragment>
  );
};
export default RepsAll;
