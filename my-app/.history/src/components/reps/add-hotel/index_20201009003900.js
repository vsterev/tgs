import React, { useState, useEffect } from 'react';
import Hotel from './shared/hotel';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import hotelsService from '../../../services/hotels';
const hotelsArr = [
  { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
  { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
  { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
  { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
  //   {"_id": 1464,"name": "Laguna Beach Albena","resortId": {"_id": 14,"name": "Albena"}}]
];
const repId = '5f777f0897c68b03f095ddaa';
const token = parseCookie('tgs-token');
const Test = (props) => {
  //   const [hotels, setHotels] = useState(hotelsArr);
  const [hotels, setHotels] = useState([]);
  const [hotelsRep, setHotelsRep] = useState([]);
  const [allHotels, setAllHotels] = useState([]);
  //   console.log(allHotels);
  const rep = 0;
  useEffect(() => {
    Promise.all([hotelsService.listAll(), repsService.getHotelsByRep(repId, token)]).then(([allHotels, repsHotel]) => {
      setAllHotels(allHotels.hotels);
      setHotelsRep(repsHotel.hotels);
      checked(allHotels.hotels, repsHotel.hotels);
    });
  }, []);

  function checked(ha, hr) {
    const hotelsRepArray = [...hr].map((a) => a._id);
    const checkedRepHotels = [...ha].map((a) => {
      if (hotelsRepArray.includes(a._id)) {
        return { ...a, checked: true };
      } else {
        return { ...a, checked: false };
      }
    });
    setHotels(checkedRepHotels);
  }
  //   console.log(hotels);
  //   console.log(checkedRepHotels);
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
