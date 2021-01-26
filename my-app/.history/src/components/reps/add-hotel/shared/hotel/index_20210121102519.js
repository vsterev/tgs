import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const Hotel = ({ hotels, updHtls, resort }) => {
  const [htls, setHtls] = useState(hotels);
  // const [viewHotels, setViewHotels] = useState(false);

  //   useEffect(() => set(), []);
  const setter = (i) => {
    const temp = [...htls];
    temp[i].checked = !temp[i].checked;
    Promise.all([setHtls(temp), updHtls(resort, htls)]);
  };
  // const toggleView = () => {
  //   const currentToggle = viewHotels;
  //   setViewHotels(!currentToggle);
  //   // console.log(viewHotels);
  // };
  return (
    <React.Fragment>
      {/* <div
        onClick={() => {
          toggleView();
        }}>
        view hotels
      </div> */}
      {/* {viewHotels && ( */}
      {/* <div> */}
      {htls.map((hotel, i) => {
        return (
          // <div key={hotel._id}>
          //   <label htmlFor={hotel._id}>{hotel.name}</label>
          //   <input
          //     type="checkbox"
          //     id={hotel._id}
          //     value={hotel._id}
          //     checked={hotel.checked}
          //     onChange={() => setter(i)}
          //     //   name={hotels}
          //   />
          // </div>
          <FormControlLabel
            key={hotel._id}
            control={<Checkbox id={hotel.name} name={hotel.name} onChange={() => setter(i)} color="primary" />}
            label={hotel.name}
          />
        );
      })}
      {/* </div> */}
      {/* )} */}
      {/* {JSON.stringify(hotels)} */}
    </React.Fragment>
  );
};
export default Hotel;
