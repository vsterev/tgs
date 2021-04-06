import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import inLookService from '../../services/inLook';
import parseCookie from '../../utils/parseCookie';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const [isLoaded, setIsLoaded] = useState(false);
  const updateHotels = () => {
    inLookService
      .syncHotels(token)
      .then((rs) => console.log(rs))
      .catch(console.log);
  };
  return (
    <div>
      {/* <Link to={() => <syncHotels />}>update hotels</Link> */}
      <button onClick={() => updateHotels()}>update hotels</button>
    </div>
  );
};
export default SystemComponent;
