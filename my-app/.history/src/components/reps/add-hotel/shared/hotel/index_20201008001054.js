import React, { useState } from 'react';
const Hotel = ({ hotel }) => {
  const [hotel, setHotel] = useState(hotel);
  return (
    <React.Fragment>
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
