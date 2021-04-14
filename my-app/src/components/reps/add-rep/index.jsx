// import { styles } from '@material-ui/pickers/views/Calendar/Calendar';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import styles from './addrep.module.css';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: theme.spacing(1),
      width: '400px',
    },
  },
}));
const AddRep = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [err, setErr] = useState('');
  const [languages, setLanguages] = useState([]);
  const token = parseCookie('tgs-token');
  const history = useHistory();
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
  const formSubmit = (e) => {
    e.preventDefault();
    const data = { firstName, familyName, phone, photo, languages };
    repsService
      .add(data, token)
      .then((a) => {
        if (!a.status) {
          setErr(a.msg.message);
        }
        history.push('/admin/reps/list');
      })
      .catch((b) => console.log(b));
  };
  console.log(languages);
  return (
    <div className={styles.wrap}>
      <h2>Add new representative</h2>
      <form onSubmit={formSubmit} className={classes.root}>
        {/* <label htmlFor={firstName}>first name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor={familyName}>family name</label>
        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        <label htmlFor={phone}>phone</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor={photo}>image</label>
        <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} /> */}
        {/* <label htmlFor="ro">romanian</label>
        <input type="checkbox" id="ro" name="romanian" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="ru">russian</label>
        <input type="checkbox" id="ru" name="russian" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="cz">czech</label>
        <input type="checkbox" id="cz" name="czech" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="pl">polish</label>
        <input type="checkbox" id="pl" name="polish" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="en">english</label>
        <input type="checkbox" id="en" name="english" onChange={(e) => langSetter(e.target.name)} /> */}
        {/* <button type="submit">add Rep ...</button> */}
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
              <Checkbox id="romanian" name="romanian" onChange={(e) => langSetter(e.target.name)} color="primary" />
            }
            label="romanian"
          />
          <FormControlLabel
            control={
              <Checkbox id="russian" name="russian" onChange={(e) => langSetter(e.target.name)} color="primary" />
            }
            label="russian"
          />
          <FormControlLabel
            control={<Checkbox id="czech" name="czech" onChange={(e) => langSetter(e.target.name)} color="primary" />}
            label="czech"
          />
          <FormControlLabel
            control={<Checkbox id="polish" name="polish" onChange={(e) => langSetter(e.target.name)} color="primary" />}
            label="polish"
          />
          <FormControlLabel
            control={
              <Checkbox id="english" name="english" onChange={(e) => langSetter(e.target.name)} color="primary" />
            }
            label="english"
          />
        </FormGroup>

        <Button
          variant="outlined"
          size="medium"
          color="primary"
          type="submit"
          startIcon={<PersonAddIcon />}
          disabled={!(languages.length > 0 && !!phone && firstName)}>
          add Rep ...
        </Button>
        {!!err && <div>{err}</div>}
      </form>
    </div>
  );
};
export default AddRep;
