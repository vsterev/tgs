import React, { useState } from 'react';
import repsService from '../../../../../services/reps';

const SearchRep = () => {
  const [nameRep, setNameRep] = useState('');
  const searchRep = () => {
    console.log(nameRep);
  };
  return (
    <form onSubmit={searchRep}>
      <input type="text" id="nameRep" value={searchRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
      <button type="submit">search</button>
    </form>
  );
};
export default SearchRep;
