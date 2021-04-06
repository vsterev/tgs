import React from 'react';
import { Link } from 'react-router-dom';
import syncHotels from './get-hotels';
const SystemComponent = () => {
  return (
    <div>
      <Link to={() => <syncHotels />}>update hotels</Link>
    </div>
  );
};
export default SystemComponent;
