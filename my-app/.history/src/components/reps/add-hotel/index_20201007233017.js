import React, { useState } from 'react';
const hotelsArr = [
  { id: 1, name: 'Laguna Beach', checked: false, resort: 'Albena' },
  { id: 2, name: 'Havana', checked: false, resort: 'Golden Sands' },
  { id: 3, name: 'Flamingo', checked: true, resort: 'Albena' },
  { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' },
];
const testInit = { id: 4, name: 'Paradise Beach', checked: false, resort: 'Golden Sands' };
const App = (props) => {
  const [hotels, setHotels] = useState([]);
  const [test, setTest] = useState(testInit);
  setHotels(hotelsArr);
  return (
    <React.Fragment>
      <form>
        <label htmlFor={2}>Laguna beach</label>
        <input type="checkbox" value="Laguna beach" name="hotels" id="1" />
      </form>
    </React.Fragment>
  );
};

export default App;
