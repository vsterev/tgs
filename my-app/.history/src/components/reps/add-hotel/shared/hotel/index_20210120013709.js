import React, { useState, useEffect } from 'react';
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
          <label key={hotel._id} htmlFor={hotel._id}>
            {hotel.name}
            <input
              type="checkbox"
              id={hotel._id}
              value={hotel._id}
              checked={hotel.checked}
              onChange={() => setter(i)}
              //   name={hotels}
            />
          </label>
          // </div>
        );
      })}
      {/* </div> */}
      {/* )} */}
      {/* {JSON.stringify(hotels)} */}
    </React.Fragment>
  );
};
export default Hotel;