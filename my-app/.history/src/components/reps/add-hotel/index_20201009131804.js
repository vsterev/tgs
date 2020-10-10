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
    const checkedRepHotels = [...ha]
      .sort((a, b) => {
        if (a.resortId.name === b.resortId.name) {
          return a.name.localeCompare(b.name.localeCompare);
        } else {
          return a.resortId.name.localeCompare(b.resortId.name);
        }
      })
      .map((a) => {
        if (hotelsRepArray.includes(a._id)) {
          return { ...a, checked: true };
        } else {
          return { ...a, checked: false };
        }
      })
      .reduce((acc, curr) => {
        acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr];
        return acc;
      }, {});
    setHotels(checkedRepHotels);
    console.log(checkedRepHotels);
  }
  function updateHotels(htl, i) {
    console.log(htl);
    // const temp = { ...hotels };
    const resort = htl.resortId.name;
    // temp[htl.resortId.name][i].checked = !htl.resortId.name[i].checked;
    console.log(hotels.resort);
    // setHotels(temp);
  }
  return (
    <React.Fragment>
      <form>
        {Object.entries(hotels).map((data) => {
          const resort = data[0];
          const hotelsInResort = data[1];
          //   console.log(resort);
          return (
            <div key={resort}>
              <div>{resort.toUpperCase()}</div>
              {hotelsInResort.map((htl, i) => {
                // return <div key={i}>-- {htl.name}</div>;
                return (
                  <div key={htl._id}>
                    {/* {console.log(i)} */}
                    <Hotel htl={htl} set={updateHotels(htl, i)} />
                  </div>
                );
              })}
            </div>
          );
        })}
        {/* {hotels.map((hotel, i) => {
          return (>
            <div key={i}>
              <Hotel htl={hotel} i={i} set={() => updateHotels(i)} />
            </div>
          );
        })} */}
      </form>
      {(!hotels || hotels.length === 0) && <div>Loading ....</div>}
      {hotels.length !== 0 && JSON.stringify(hotels)}
    </React.Fragment>
  );
};

export default Test;
