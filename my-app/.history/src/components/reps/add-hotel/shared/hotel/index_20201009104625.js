import React, { useState, useEffect } from 'react';
const Hotel = ({ htl, i, set }) => {
  //   const [hotel, setHotel] = useState(htl);
  //   useEffect(() => set(), []);
  return (
    <div key={htl._id}>
      <label htmlFor={htl._id}>
        {htl.name} / {htl.resortId.name}
      </label>
      <input
        type="checkbox"
        value={htl.name}
        name="hotels"
        id={htl._id}
        checked={htl.checked}
        onChange={() => set(i)}
      />
      {/* {JSON.stringify(htl)} */}
    </div>
  );
};
export default Hotel;
