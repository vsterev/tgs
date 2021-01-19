import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import Hotels from './shared/hotels';
import SearchRep from './shared/searchRep';
import Button from '@material-ui/core/Button';
// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import styles from './agetAll.module.css';
const RepsAll = () => {
  const token = parseCookie('tgs-token');
  const [reps, setReps] = useState([]);
  const [err, setErr] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    repsService
      .getAll(token)
      .then((result) => {
        if (!result.status) {
          setErr(result.msg);
          return;
        }
        setReps(result.reps);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className={styles.repwrapper}>
      {/* <Link to="/admin/reps/add-rep">add new Rep</Link> */}
      <Button
        component={Link}
        variant="outlined"
        color="primary"
        to="/admin/reps/add-rep"
        className={styles.buttonaddrep}>
        + add new Rep
      </Button>
      <h2 className={styles.head}>Representatives list</h2>
      <SearchRep token={token} setReps={setReps} setErr={setErr} reps={reps} />
      {reps.map((rep, k) => {
        return (
          <div key={k}>
            <div onClick={() => setVisible(!visible)}>
              {rep.firstName} {rep.familyName} - {rep.phone} - {rep.email}
            </div>
            <Link to={`/admin/reps/edit-rep/${rep._id}`}>edit rep</Link>
            <Hotels hotels={rep.hotels} repId={rep._id} />
          </div>
        );
      })}
      {err && (
        <div>
          {err.name} - {err.message}
        </div>
      )}
      {/* {JSON.stringify(reps)} */}
    </div>
  );
};
export default RepsAll;
