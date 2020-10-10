import React, { useState, useEffect } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
const token = parseCookie('tgs-token');
useEffect(() => {
  repsService(token)
    .then((reps) => console.log(reps))
    .catch((e) => console.log(e));
}, []);
class RepsAll extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h2>All Reps</h2>
      </React.Fragment>
    );
  }
}
export default RepsAll;
