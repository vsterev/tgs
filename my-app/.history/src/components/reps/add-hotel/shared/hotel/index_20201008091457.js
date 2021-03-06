import React, { useState, useEffect } from 'react';
const Hotel = ({ htl, i, set }) => {
  //   const [hotel, setHotel] = useState(htl);
  //   useEffect(() => set(), []);
  return (
    <div key={i}>
      <label htmlFor={htl.id}>{htl.name}</label>
      <input
        type="checkbox"
        value={htl.name}
        name="hotels"
        id={htl.id}
        checked={htl.checked}
        onChange={() => setHotel({ ...hotel, checked: !hotel.checked })}
      />
      {JSON.stringify(hotel)}
    </div>
  );
};
export default Hotel;
