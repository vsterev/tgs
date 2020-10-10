import React, { useState } from 'react';
// const hotelsArr = [
//   { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
//   { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
//   { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
//   { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
// ];
const Test = (props) => {
  const testInit = { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' };
  const [test, setTest] = useState(testInit);
  return (
    <React.Fragment>
      <form>
        <label htmlFor={2}>{test.id}</label>
        <input type="checkbox" value={test.name} name="hotels" id={test.id} checked={test.checked} onChange={()=>setTest({...,checked:!checked})}/>
      </form>
      {test}
    </React.Fragment>
  );
};

export default Test;
