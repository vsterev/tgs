import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const Hotels = ({ hotels }) => {
  const [visible, setVisible] = useState(false);
  const reduced = hotels.reduce((acc, curr) => {
    acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr.name];
    return acc;
  }, {});
  const sorted = [...Object.entries(reduced)].sort((a, b) => a[0].localeCompare(b[0]));
  //   console.log(sorted);
  function toggleView() {
    setVisible(!visible);
  }
  return (
    <div>
      <div>
        <button onClick={toggleView}>view hotels of rep</button>
      </div>
      {visible &&
        sorted.map((info, i) => {
          const resort = info[0];
          const hotels = info[1];
          return <div key={i}>{resort}</div>;
        })}
    </div>
  );
};
export default Hotels;
