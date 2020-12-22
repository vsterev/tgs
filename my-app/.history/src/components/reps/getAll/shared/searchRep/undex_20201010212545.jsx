import React, { useState } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = () => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const searcjCriteria = { nameRep, resort };
  const searchRep = () => {
    console.log(nameRep);
  };
  return (
    <form onSubmit={searchRep}>
      <input type="text" id="nameRep" value={searchRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
      <input type="text" id="nameRep" value={searchRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <button type="submit">search</button>
    </form>
  );
};
export default SearchRep;