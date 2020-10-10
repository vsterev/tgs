import React, { useState, useEffect } from 'react';
import Hotel from './shared/hotel';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
const hotelsArr = [
  { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
  { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
  { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
  { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
];
const repId = '5f777f0897c68b03f095ddaa';
const token = parseCookie('tgs-token');
const Test = (props) => {
  const [hotels, setHotels] = useState(hotelsArr);
  useEffect(() => {
    repsService.getHotelsByRep(repId, token).then((htl) => console.log(htl.hotels));
  }, []);
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
