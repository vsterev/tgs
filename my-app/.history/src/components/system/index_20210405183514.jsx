import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import inLookService from '../../services/inLook';
import parseCookie from '../../utils/parseCookie';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const [isLoaded, setIsLoaded] = useState(false);
  const updateHotels = () => {
    setIsLoaded(true);
    inLookService
      .syncHotels(token)
      .then((rs) => {
        console.log(rs);
        setIsLoaded(false);
      })
      .catch(console.log);
  };
  const updateCities = () => {
    setIsLoaded(true);
    inLookService
      .syncCities(token)
      .then((rs) => {
        console.log(rs);
        setIsLoaded(false);
      })
      .catch(console.log);
  };
  return (
    <div>
      {/* <Link to={() => <syncHotels />}>update hotels</Link> */}
      <button onClick={() => updateHotels()}>update hotels</button>
      <button onClick={() => updateCities()}>update cities</button>
      {isLoaded && <div>Loading ....</div>}
    </div>
  );
};
export default SystemComponent;
