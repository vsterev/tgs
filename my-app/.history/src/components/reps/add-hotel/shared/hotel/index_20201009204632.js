import React, { useState, useEffect } from 'react';
const Hotel = ({ hotels, updHtls, resort }) => {
  const [htls, setHtls] = useState(hotels);
  const [viewHotels, setViewHotels] = useState(false);

  //   useEffect(() => set(), []);
  const setter = (i) => {
    const temp = [...htls];
    temp[i].checked = !temp[i].checked;
    Promise.all([setHtls(temp), updHtls(resort, htls)]);
  };
  const toggleView = () => {
    setViewHotels(!viewHotels);
  };
  return (
    <div
      onClick={() => {
        toggleView();
      }}>
      {' '}
      view hotels
      {htls.map((hotel, i) => {
        return (
          <div key={i}>
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
      {JSON.stringify(hotels)}
    </div>
  );
};
export default Hotel;
