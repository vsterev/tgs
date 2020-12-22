import React, { useState } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = () => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const [hotel, setHotel] = useState('');
  const searcjCriteria = { nameRep, resort };
  const searchRep = () => {
    console.log(nameRep);
  };
  return (
    <form onSubmit={searchRep}>
      <input type="text" id="nameRep" value={nameRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
      <input type="text" id="hotel" value={hotel} onChange={(e) => setHotel(e.currentTarget.value)} />
      <button type="submit">Search ...</button>
    </form>
  );
};
export default SearchRep;
