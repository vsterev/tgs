import React, { useState } from 'react';
const Hotel = ({ hotel }) => {
  const [hotel, setHotel] = useState(hotel);
  return (
    <React.Fragment>
      <label htmlFor={test.id}>{test.name}</label>
      <input
        type="checkbox"
        value={test.name}
        name="hotels"
        id={test.id}
        checked={test.checked}
        onChange={() => setTest({ ...test, checked: !test.checked })}
      />
    </React.Fragment>
  );
};
export default Hotel;
