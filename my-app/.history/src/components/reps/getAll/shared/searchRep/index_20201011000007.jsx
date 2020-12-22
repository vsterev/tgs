import React, { useState, useEffect } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = ({ token, setReps, setErr, reps }) => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const [hotel, setHotel] = useState('');
  const [temp, setTemp] = useState([]);
  useEffect(() => {
    const temp = [...reps];
  }, []);
  const searchCriteria = { nameRep, resort, hotel };
  // console.log(reps);
  const hotelIncludes = (a, hotel) => {
    return (
      a.hotels.filter((b) => {
        // b.name.toLowerCase().includes(hotel.toLowerCase());
        if (b.name.toLowerCase().includes(hotel.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const resortIncludes = (a, resort) => {
    return (
      a.hotels.filter((b) => {
        // b.name.toLowerCase().includes(hotel.toLowerCase());
        if (b.resortId.name.toLowerCase().includes(resort.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const searchRep = (e) => {
    e.preventDefault();
    // repsService
    // .getAll(token, searchCriteria)
    // .then((result) => {
    //   if (!result.status) {
    //     setErr(result.msg);
    //     return;
    //   }
    //   setReps(result.reps);
    // })
    // .catch((e) => console.log(e));
    const searched = temp.filter((a) => {
      if (
        a.firstName.toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      } else if (
        a.familyName.toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      } else if (
        (a.firstName + ' ' + a.familyName).toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      }
    });
    setReps(searched);
    console.log(temp);
  };
  const isDisabled = (nameRep.length === 0) & (resort.length === 0) & (hotel.length === 0);
  return (
    <form onSubmit={searchRep}>
      <label htmlFor="nameRep">name</label>
      <input type="text" id="nameRep" value={nameRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <label htmlFor="resort">resort</label>
      <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
      <label htmlFor="hotel">hotel</label>
      <input type="text" id="hotel" value={hotel} onChange={(e) => setHotel(e.currentTarget.value)} />
      <button type="submit">Search ...</button>
    </form>
  );
};
export default SearchRep;
