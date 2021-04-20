import styles from './system.module.css';
import React, { useState } from 'react';
import inLookService from '../../services/inLook';
import parseCookie from '../../utils/parseCookie';
import UserRatings from './shared/user-ratings';
const SystemComponent = () => {
  const token = parseCookie('tgs-token');
  const [isLoaded, setIsLoaded] = useState(false);
  const [num, setNum] = useState(null);
  const [ratingsDisplat, setRatingsDisplay] = useState(false);
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
      <p>Interlook functions: </p>
      <button className={styles.buttonSys} onClick={() => updateHotels()}>
        update hotels
      </button>
      <button className={styles.buttonSys} onClick={() => updateCities()}>
        update cities
      </button>
      <button className={styles.buttonSys} onClick={() => setRatingsDisplay(true)}>
        ratings
      </button>
      {isLoaded && <div>Loading ....</div>}
      {!!num && <div>{num} items added to database</div>}
    </div>
  );
};
export default SystemComponent;
