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
  function updateHotels(i) {
    const temp = [...hotels];
    temp[i].checked = !temp[i].checked;
    setHotels(temp);
  }
  return (
    <React.Fragment>
      <form>
        {hotels.map((hotel, i) => {
          return (
            <div key={i}>
              <Hotel htl={hotel} i={i} set={() => updateHotels(i)} />
            </div>
          );
        })}
      </form>
      {JSON.stringify(hotels)}
    </React.Fragment>
  );
};

export default Test;
