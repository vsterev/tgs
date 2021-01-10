import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
const AddRep = () => {
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
    const data = { firstName, familyName, phone, photo };
    repsService
      .add(data, token)
      .then((a) => {
        if (!a.status) {
          setErr(a.msg.message);
        }
        history.push('/admin/reps/all');
      })
      .catch((b) => console.log(b));
  };
  console.log(languages);
  return (
    <React.Fragment>
      <h3>Add new representative</h3>
      <form onSubmit={formSubmit}>
        <label htmlFor={firstName}>first name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor={familyName}>familyt name</label>
        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        <label htmlFor={phone}>phone</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor={photo}>image</label>
        <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <label htmlFor="ro">romanian</label>
        <input type="checkbox" id="ro" name="ro" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="ru">russian</label>
        <input type="checkbox" id="ru" name="ru" onChange={(e) => langSetter(e.target.name)} />
        <button type="submit">add Rep ...</button>
        {!!err && <div>{err}</div>}
      </form>
    </React.Fragment>
  );
};
export default AddRep;
