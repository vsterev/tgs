import React, { useState, useEffect } from 'react';
const Hotel = ({ hotels }) => {
  const [htls, setHtls] = useState(hotels);
  //   useEffect(() => set(), []);
  const setter = (i) => {
    htls[i].checked = !htls[i].checked;
    setHtls(htls);
  };
  return (
    <div>
      {htls.map((hotel, i) => {
        return (
          <div key={i}>
            <label htmlFor={hotel._id}>{hotel.name}</label>
            <input
              type="checkbox"
              id={hotel._id}
              value={hotel._id}
              checked={hotel.checked}
              onChange={() => setter(i)}
              name={hotels}
            />
          </div>
        );
      })}
      {JSON.stringify(hotels)}
    </div>
  );
};
export default Hotel;
