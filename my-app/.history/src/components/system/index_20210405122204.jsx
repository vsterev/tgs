import React from 'react';
import { Link } from 'react-router-dom';
const SystemComponent = () => {
  return (
    <div>
      <Link to={'http://localhost:4000/il/get-hotels'}>update hotels</Link>
    </div>
  );
};
export default SystemComponent;
