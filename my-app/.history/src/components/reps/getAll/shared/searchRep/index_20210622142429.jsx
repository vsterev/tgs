import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import repsService from '../../../../../services/reps';
import styles from './searchRep.module.css';
import parseCookie from '../../../../../utils/parseCookie';

const SearchRep = ({ setReps, setErr, reps, setOpenSnack }) => {
  const [nameRep, setNameRep] = useState('');
  const [resort, setResort] = useState('');
  const [hotel, setHotel] = useState('');
  // const [temp, setTemp] = useState([]);
  const tempReps = [...reps];

  // const searchCriteria = { nameRep, resort, hotel };
  const hotelIncludes = (a, hotel) => {
    return (
      a.hotels.filter((b) => {
        if (b.name.toLowerCase().includes(hotel.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const resortIncludes = (a, resort) => {
    return (
      a.hotels.filter((b) => {
        if (b.resortId.name.toLowerCase().includes(resort.toLowerCase())) {
          return true;
        }
      }).length > 0
    );
  };
  const reset = () => {
    const token = parseCookie('tgs-token');

    // e.preventDefault();
    repsService
      .getAll(token)
      .then((result) => {
        if (!result.status) {
          setErr(result.msg);
          return;
        }
        setReps(result.reps);
        setOpenSnack(true);
      })
      .then(func)
      .catch((e) => console.log(e));
  };
  const searchRep = (e) => {
    e.preventDefault();
    if (!nameRep & !hotel & !resort) {
      reset();
    }

    const searched = tempReps.filter((a) => {
      if (
        a.firstName.toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      } else if (
        a.familyName.toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      } else if (
        (a.firstName + ' ' + a.familyName).toLowerCase().includes(nameRep.toLowerCase()) &
        hotelIncludes(a, hotel) &
        resortIncludes(a, resort)
      ) {
        return true;
      }
      setOpenSnack(true);
    });

    setReps(searched);
    // setResort('');
    // setHotel('');
    // setNameRep('');
  };
  const isDisabled = (nameRep.length === 0) & (resort.length === 0) & (hotel.length === 0);
  return (
    <React.Fragment>
      <form onSubmit={searchRep} className={styles.formrepsearch}>
        {/* <label htmlFor="nameRep">name</label>
        <input type="text" id="nameRep" value={nameRep} onChange={(e) => setNameRep(e.currentTarget.value)} />
        <label htmlFor="resort">resort</label>
        <input type="text" id="resort" value={resort} onChange={(e) => setResort(e.currentTarget.value)} />
        <label htmlFor="hotel">hotel</label>
        <input type="text" id="hotel" value={hotel} onChange={(e) => setHotel(e.currentTarget.value)} /> */}
        {/* <button type="submit">Search ...</button> */}
        <TextField
          id="standard-basic"
          label="representaive name"
          name="nameRep"
          value={nameRep}
          onChange={(e) => setNameRep(e.currentTarget.value)}
        />
        <TextField
          id="standard-basic"
          label="resort name"
          name="resort"
          value={resort}
          onChange={(e) => setResort(e.currentTarget.value)}
        />
        <TextField
          id="standard-basic"
          label="hotel name"
          name="hotel"
          value={hotel}
          onChange={(e) => setHotel(e.currentTarget.value)}
        />
        <Button variant="outlined" size="medium" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </React.Fragment>
  );
};
export default SearchRep;
