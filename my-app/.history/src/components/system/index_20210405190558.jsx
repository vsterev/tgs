import styles from './system.module.css';
import React, { useState } from 'react';
import inLookService from '../../services/inLook';
import parseCookie from '../../utils/parseCookie';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const [isLoaded, setIsLoaded] = useState(false);
  const [num, setNum] = useState(null);
  const autoHide = () => {
    setTimeout(function () {
      setNum(null);
    }, 3000);
  };
  const updateHotels = () => {
    setIsLoaded(true);
    inLookService
      .syncHotels(token)
      .then((rs) => {
        setNum(rs);
        setIsLoaded(false);
        autoHide();
      })
      .catch(console.log);
  };
  const updateCities = () => {
    setIsLoaded(true);
    inLookService
      .syncCities(token)
      .then((rs) => {
        setNum(rs);
        setIsLoaded(false);
        autoHide();
      })
      .catch(console.log);
  };
  return (
    <div className={styles.wrapper}>
      <h2>System properties</h2>
      {/* <Link to={() => <syncHotels />}>update hotels</Link> */}
      <button className={styles.button} onClick={() => updateHotels()}>
        update hotels
      </button>
      <button onClick={() => updateCities()}>update cities</button>
      {isLoaded && <div>Loading ....</div>}
      {!!num && <div>{num} items added to database</div>}
    </div>
  );
};
export default SystemComponent;
