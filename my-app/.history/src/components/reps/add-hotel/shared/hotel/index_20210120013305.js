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
    <Rect.Fragment>
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
          <div key={hotel._id}>
            <label htmlFor={hotel._id}>{hotel.name}</label>
            <input
              type="checkbox"
              id={hotel._id}
              value={hotel._id}
              checked={hotel.checked}
              onChange={() => setter(i)}
              //   name={hotels}
            />
          </div>
        );
      })}
      {/* </div> */}
      {/* )} */}
      {/* {JSON.stringify(hotels)} */}
    </Rect.Fragment>
  );
};
export default Hotel;
