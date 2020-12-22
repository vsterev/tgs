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
  const token = parseCookie('tgs-token');
  const history = useHistory();
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
        <button type="submit">add Rep ...</button>
        {!!err && <div>{err}</div>}
      </form>
    </React.Fragment>
  );
};
export default AddRep;
