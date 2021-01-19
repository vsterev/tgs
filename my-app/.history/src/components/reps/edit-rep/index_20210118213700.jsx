import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import parseCookie from '../../../utils/parseCookie';
import repsService from '../../../services/reps';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import styles from './edite.module.css';
// const styles = './editrep.moule.css';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const EditRep = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [languages, setLanguages] = useState([]);
  const [err, setErr] = useState('');
  const { repId } = useParams();
  const history = useHistory();
  const token = parseCookie('tgs-token');
  useEffect(() => {
    repsService.details(repId, token).then((a) => {
      if (!a.status) {
        if (!!a.redirect) {
          history.push('/admin/logout');
          return;
        }
        setErr(`Error fetching data for user with id-${repId}`);
        return;
      }
      setFirstName(a.result.firstName);
      setFamilyName(a.result.familyName);
      setPhone(a.result.phone);
      setFirstName(a.result.firstName);
      setLanguages(a.result.languages);
    });
  }, []);
  const formSubmit = (e) => {
    const data = { repId, firstName, familyName, phone, photo, languages };
    e.preventDefault();
    repsService
      .repUpdate(data, token)
      .then((a) => {
        if (!a.status) {
          setErr(a.msg.message);
          return;
        }
        history.push(`/admin/reps/list`);
      })
      .catch((er) => console.log(er));
  };
  const deleteRep = (e) => {
    e.preventDefault();
    if (window.confirm('Please confirm delete process !')) {
      repsService
        .delete({ repId }, token)
        .then((a) => {
          if (!a.status) {
            setErr(a.status.msg);
            return;
          }
          history.push('/admin/reps/list');
        })
        .catch((err) => setErr(err.msg));
    }
  };
  const langSetter = (lang) => {
    if (!languages.includes(lang)) {
      setLanguages([...languages, lang]);
    } else {
      const lngTemp = [...languages];
      const index = lngTemp.indexOf(lang);
      if (index > -1) {
        lngTemp.splice(index, 1);
        setLanguages(lngTemp);
      }
    }
  };
  return (
    <div className={styles.wrap}>
      <h2>Edit representative</h2>
      <form onSubmit={formSubmit} className={classes.root}>
        {/* <label htmlFor="firstName">first name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="familyName">familyt name</label>
        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        <label htmlFor="phone">phone</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="photo">image</label>
        <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} /> */}
        {/* <label htmlFor="romanian">romanian</label>
        <input
          type="checkbox"
          id="romanian"
          name="romanian"
          // value="ro"
          checked={languages?.includes('romanian')}
          onChange={(e) => langSetter(e.target.name)}
        />
        <label htmlFor="russian">russian</label>
        <input
          type="checkbox"
          id="russian"
          name="russian"
          checked={languages?.includes('russian')}
          onChange={(e) => langSetter(e.target.name)}
        />
        <label htmlFor="czech">czech</label>
        <input
          type="checkbox"
          id="czech"
          name="czech"
          checked={languages?.includes('czech')}
          onChange={(e) => langSetter(e.target.name)}
        />
        <label htmlFor="polish">polish</label>
        <input
          type="checkbox"
          id="polish"
          name="polish"
          checked={languages?.includes('polish')}
          onChange={(e) => langSetter(e.target.name)}
        />
        <label htmlFor="english">english</label>
        <input
          type="checkbox"
          id="english"
          name="english"
          checked={languages?.includes('english')}
          onChange={(e) => langSetter(e.target.name)}
        /> */}
        <button type="submit">edit Rep ...</button>
        <button type="button" onClick={deleteRep}>
          delete rep
        </button>
        <TextField
          id="firstName"
          label="first name"
          name="firstName"
          value={firstName}
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <TextField
          id="familyName"
          label="family name"
          name="familyName"
          value={familyName}
          variant="outlined"
          onChange={(e) => setFamilyName(e.target.value)}
        />
        <TextField
          id="phone"
          label="phone number"
          name="phone"
          value={phone}
          variant="outlined"
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <TextField
          id="photo"
          label="image"
          name="photo"
          value={photo}
          variant="outlined"
          onChange={(e) => setPhoto(e.target.value)}
        />
        <h4>speaking languages*:</h4>
        <FormGroup column>
          <FormControlLabel
            control={
              <Checkbox
                id="romanian"
                name="romanian"
                checked={languages?.includes('romanian')}
                onChange={(e) => langSetter(e.target.name)}
                color="primary"
              />
            }
            label="romanian"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="russian"
                name="russian"
                checked={languages?.includes('russian')}
                onChange={(e) => langSetter(e.target.name)}
                color="primary"
              />
            }
            label="russian"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="czech"
                name="czech"
                checked={languages?.includes('czech')}
                onChange={(e) => langSetter(e.target.name)}
                color="primary"
              />
            }
            label="czech"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="polish"
                name="polish"
                checked={languages?.includes('polish')}
                onChange={(e) => langSetter(e.target.name)}
                color="primary"
              />
            }
            label="polish"
          />
          <FormControlLabel
            control={
              <Checkbox
                id="english"
                name="english"
                checked={languages?.includes('english')}
                onChange={(e) => langSetter(e.target.name)}
                color="primary"
              />
            }
            label="english"
          />
        </FormGroup>
        <Button variant="outlined" size="medium" color="primary" type="submit">
          edit Rep
        </Button>
        <Button variant="outlined" size="medium" color="secondary" onClick={deleteRep}>
          - delete Rep
        </Button>
        {!!err && <div>{err}</div>}
      </form>
    </div>
  );
};
export default EditRep;
