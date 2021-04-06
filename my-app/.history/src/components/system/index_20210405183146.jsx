import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import inLookService from '../../services/inLook';
import parseCookie from '../../utils/parseCookie';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const [isLoaded, setIsLoaded] = useState(false);
  const updater = (str) => {
    let fun = '';
    if (str === 'hotels') {
      fun = 'syncHotels';
    }
    setIsLoaded(true);
    inLookService
      .${fun}(token)
      .then((rs) => {
        console.log(rs);
        setIsLoaded(false);
      })
      .catch(console.log);
  };
  return (
    <div>
      {/* <Link to={() => <syncHotels />}>update hotels</Link> */}
      <button onClick={() => updater('hotels')}>update hotels</button>
      <button onClick={() => updater('cities')}>update cities</button>
      {isLoaded && <div>Loading ....</div>}
    </div>
  );
};
export default SystemComponent;
