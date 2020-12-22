import React, { useState, useEffect } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = ({ token, setReps, setErr, reps }) => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const [hotel, setHotel] = useState('');
  // const [temp, setTemp] = useState([]);
  const temp = [...reps];
  const searchCriteria = { nameRep, resort, hotel };
  const hotelIncludes = (a, hotel) => {
    return (
      a.hotels.filter((b) => {
        if (b.name.toLowerCase().includes(hotel.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const resortIncludes = (a, resort) => {
    return (
      a.hotels.filter((b) => {
        if (b.resortId.name.toLowerCase().includes(resort.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const reset = (func) => {
    // e.preventDefault();
    repsService
      .getAll(token)
      .then((result) => {
        if (!result.status) {
          setErr(result.msg);
          return;
        }
        setReps(result.reps);
      })
      .then(func)
      .catch((e) => console.log(e));
  };
  const searchRep = async (e) => {
    e.preventDefault();
    // if (!nameRep & !hotel & !resort) {
    //   await reset();
    // }
    await reset(setReps(searched));

    const searched = reps.filter((a) => {
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
    await setReps(searched);
    await setResort('');
    await setHotel('');
    await setNameRep('');
  };
  const isDisabled = (nameRep.length === 0) & (resort.length === 0) & (hotel.length === 0);
  return (
    <React.Fragment>
      <form onSubmit={searchRep}>
        <label htmlFor="nameRep">name</label>
        <input type="text" id="nameRep" value={nameRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
        <label htmlFor="resort">resort</label>
        <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
        <label htmlFor="hotel">hotel</label>
        <input type="text" id="hotel" value={hotel} onChange={(e) => setHotel(e.currentTarget.value)} />
        <button type="submit">Search ...</button>
      </form>
    </React.Fragment>
  );
};
export default SearchRep;
