import React, { useState } from 'react';

const SearchRep = () => {
  const [nameRep, setNameRep] = useState('');
  return (
    <form onSubmit={searchRep}>
      <input type="text" id="nameRep" value={searchRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
    </form>
  );
};
export default SearchRep;
