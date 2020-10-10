import React, { useState } from 'react';
const Hotel = ({ htl, key }) => {
  const [hotel, setHotel] = useState(htl);
  return (
    <React.Fragment key={key}>
      <label htmlFor={hotel.id}>{hotel.name}</label>
      <input
        type="checkbox"
        value={hotel.name}
        name="hotels"
        id={hotel.id}
        checked={hotel.checked}
        onChange={() => setHotel({ ...hotel, checked: !hotel.checked })}
      />
    </React.Fragment>
  );
};
export default Hotel;
