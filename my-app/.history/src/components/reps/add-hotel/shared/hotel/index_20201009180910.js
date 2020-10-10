import React, { useState, useEffect } from 'react';
const Hotel = ({ hotels }) => {
  const [htls, setHtls] = useState(hotels);
  //   useEffect(() => set(), []);
  const setter = (i) => {
    hotels[i].checked = !hotels[i].checked;
  };
  return (
    <div>
      {htls.map((hotel, i) => {
        return (
          <div key={i}>
            <input type="checbox" id={hotel._id} value={hotel._id} checked={hotel.checked} onChange={setter(i)} />
          </div>
        );
      })}
    </div>
  );
};
export default Hotel;
