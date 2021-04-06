import React from 'react';
import { Link } from 'react-router-dom';
import syncHotels from './get-hotels';
import parseCookie from '../../../utils/parseCookie';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const updateHotels = () => {
    syncHotels(token);
  };
  return (
    <div>
      {/* <Link to={() => <syncHotels />}>update hotels</Link> */}
      <button onClick={() => console.log('tuk e')}>update hotels</button>
    </div>
  );
};
export default SystemComponent;
