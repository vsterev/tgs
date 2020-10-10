import React, { useState } from 'react';
const Hotel = ({ htl, i }) => {
  const [hotel, setHotel] = useState(htl);
  return (
    <div key={i}>
      <label htmlFor={hotel.id}>{hotel.name}</label>
      <input
        type="checkbox"
        value={hotel.name}
        name="hotels"
        id={hotel.id}
        checked={hotel.checked}
        onChange={() => setHotel({ ...hotel, checked: !hotel.checked })}
      />
      {JSON.stringify(hotel)}
    </div>
  );
};
export default Hotel;
