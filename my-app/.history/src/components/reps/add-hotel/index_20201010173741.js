import React, { useState, useEffect } from 'react';
import Hotel from './shared/hotel';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import hotelsService from '../../../services/hotels';
import bindHotelsToRep from '../../../functions/bindHotelsToRep';
import { useParams } from 'react-router-dom';

return;
// const repId = '5f777f0897c68b03f095ddaa';
const token = parseCookie('tgs-token');
const Test = (props) => {
  const [hotels, setHotels] = useState([]);

  const [err, setErr] = useState(null);
  const params = useParams();
  const { rep } = params;
  console.log(params.repId);
  //   const [hotelsRep, setHotelsRep] = useState([]);
  //   const [allHotels, setAllHotels] = useState([]);
  const rep = 0;
  useEffect(() => {
    // const allHotels = await hotelsService.listAll();
    // console.warn(allHotels);

    Promise.all([hotelsService.listAll(), repsService.getHotelsByRep(repId, token)]).then(([allHotels, repsHotel]) => {
      if (allHotels.status & repsHotel.status) {
        //   setAllHotels(allHotels.hotels);
        //   setHotelsRep(repsHotel.hotels);
        bindHotelsToRep(allHotels.hotels, repsHotel.hotels, setHotels);
        return;
      }
      // console.log(repsHotel.msg || allHotels.msg);
      setErr(repsHotel.msg);
      // return;
    });
  }, []);

  //sort, reduce to group array and ass flag checked
  // function checked(ha, hr) {
  //   const hotelsRepArray = [...hr].map((a) => a._id);
  //   const checkedRepHotels = [...ha]
  //     .sort((a, b) => {
  //       if (a.resortId.name === b.resortId.name) {
  //         return a.name.localeCompare(b.name.localeCompare);
  //       } else {
  //         return a.resortId.name.localeCompare(b.resortId.name);
  //       }
  //     })
  //     .map((a) => {
  //       if (hotelsRepArray.includes(a._id)) {
  //         return { ...a, checked: true };
  //       } else {
  //         return { ...a, checked: false };
  //       }
  //     })
  //     .reduce((acc, curr) => {
  //       acc[curr.resortId.name] = [...(acc[curr.resortId.name] || []), curr];
  //       return acc;
  //     }, {});
  //   setHotels(checkedRepHotels);
  //   console.log(checkedRepHotels);
  // }
  const updHtls = (resort, tmp) => {
    const temp = { ...hotels };
    temp[resort] = [...tmp]; //masiva e bil problema
    setHotels(temp);
  };
  const countChecked = (arr) => {
    const checked = arr.filter((a) => a['checked'] === true).length;
    const all = arr.length;
    return { checked, all };
  };
  const submitForm = (e) => {
    e.preventDefault();
    let tmp = [...Object.values(hotels)]
      .map((a) =>
        a.map((b) => {
          if (b.checked) {
            return b._id;
          }
        })
      )
      .reduce((acc, curr) => acc.concat(curr), [])
      .filter((a) => a !== undefined);
    console.log(tmp);
    repsService.repUpdate({ repId, hotels: tmp }, token).then((a) => {
      if (a.status) {
        console.log('Hotels are updated');
        return;
      }
      console.log(a.msg);
    });
  };
  return (
    <React.Fragment>
      <form onSubmit={submitForm}>
        {Object.entries(hotels).map((data) => {
          const resort = data[0];
          const hotelsInResort = data[1];
          //   console.log(resort);
          return (
            <div key={resort}>
              <div>
                {resort.toUpperCase()} - {countChecked(hotelsInResort).checked} from {countChecked(hotelsInResort).all}{' '}
                hotels selected
              </div>

              <Hotel hotels={hotelsInResort} updHtls={(resort, t) => updHtls(resort, t)} resort={resort} />
            </div>
          );
        })}
        <button type="submit">Add hotels</button>
      </form>
      {(!hotels || hotels.length === 0) && <div>Loading ....</div>}
      {!!err && <div>{err.message}</div>}
    </React.Fragment>
  );
};

export default Test;
