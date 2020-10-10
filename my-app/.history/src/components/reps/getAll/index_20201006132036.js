import React, { useState, useEffect } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';

const RepsAll = () => {
  // const token = parseCookie('tgs-token');
  // useEffect(() => {
  //   repsService(token)
  //     .then((reps) => console.log(reps))
  //     .catch((e) => console.log(e));
  // }, []);
  return (
    <React.Fragment>
      <h2>All Reps</h2>
    </React.Fragment>
  );
};
export default RepsAll;
