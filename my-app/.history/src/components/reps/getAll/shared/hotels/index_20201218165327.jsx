import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Hotels = ({ hotels, repId }) => {
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const reduced = hotels.reduce((acc, curr) => {
    acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr.name];
    return acc;
  }, {});
  const sorted = [...Object.entries(reduced)].sort((a, b) => a[0].localeCompare(b[0]));
  // console.log(sorted);
  function toggleView() {
    setVisible(!visible);
  }
  return (
    <div>
      <div>
        <button onClick={toggleView}>view hotels of rep</button>
        {/* <button onClick={history.goBack()}>back</button> */}
      </div>
      {visible &&
        sorted.map((info, i) => {
          const resort = info[0];
          const hotels = info[1];
          return (
            <div key={i}>
              <div>
                {resort} - {hotels.length} hotels
              </div>
              {hotels.map((hotel, ind) => (
                <div key={ind}>{hotel}</div>
              ))}
            </div>
          );
        })}
      {visible && <Link to={`/admin/reps/add-hotel/${repId}`}>edit hotels</Link>}
    </div>
  );
};
export default Hotels;
