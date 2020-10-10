import React, { useState } from 'react';
import Hotel from './shared/hotel';
const hotelsArr = [
  { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
  { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
  { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
  { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
];
const Test = (props) => {
  const [hotels, setHotels] = useState(hotelsArr);
  return (
    <React.Fragment>
      <form>
        {hotels.map((hotel, i) => (
          <Hotel htl={hotel} key={i} />
        ))}
      </form>
      {hotels}
    </React.Fragment>
  );
};

export default Test;
