import React, { useState } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = ({ token, setRep, setErr }) => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const [hotel, setHotel] = useState('');
  const searchCriteria = { nameRep, resort, hotel };
  const searchRep = (e) => {
    e.preventDefault();
    console.log(searchCriteria);
  };
  const isEnabled = nameRep.length > 0 || resort.length > 0 || hotel.length > 0;
  return (
    <form onSubmit={searchRep}>
      <label htmlFor="nameRep">name</label>
      <input type="text" id="nameRep" value={nameRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <label htmlFor="resort">resort</label>
      <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
      <label htmlFor="hotel">hotel</label>
      <input type="text" id="hotel" value={hotel} onChange={(e) => setHotel(e.currentTarget.value)} />
      <button type="submit" disabled={isEnabled}>
        Search ...
      </button>
    </form>
  );
};
export default SearchRep;
