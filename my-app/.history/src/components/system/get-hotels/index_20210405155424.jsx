import React, { useEffect } from 'react';
import ilService from '../../../services/inLook';
import parseCookie from '../../../../utils/parseCookie';
const token = parseCookie('tgs-token');
const SyncHotels = () => {
  useEffect(() => {
    ilService.syncHotels(token).then((cities) => console.log(cities));
  }, []);
};
export default SyncHotels;
