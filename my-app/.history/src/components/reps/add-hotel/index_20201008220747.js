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
  const [hotels, setHotels] = useState(hotelsArr);
  const [hotelsRep, setHotelsRep] = useState(null);
  const [allHotels, setAllHotels] = useState(null);
  //   console.log(hotelsRep);
  useEffect(() => {
    hotelsService.listAll().then((allHotels) => setAllHotels(allHotels));
    repsService.getHotelsByRep(repId, token).then((htl) => setHotelsRep(htl.hotels));
  }, []);
  //   const modifiedHotelsRep = hotelsRep.map((a) => a._id);
  //   console.log(modifiedHotelsRep);

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
