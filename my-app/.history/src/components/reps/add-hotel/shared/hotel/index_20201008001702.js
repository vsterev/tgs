import React, { useState } from 'react';
const Hotel = ({ hotel, key }) => {
  const [hotel, setHotel] = useState(hotel);
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
