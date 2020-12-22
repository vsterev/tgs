import React, { useState, useEffect } from 'react';
import parseCookie from '../../../utils/parseCookie';
const EditRep = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [err, setErr] = useState('');
  const token = parseCookie('tgs-token');
  const formSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <React.Fragment>
      <h3>Edit representative</h3>
      <form onSubmit={formSubmit}>
        <label htmlFor={firstName}>first name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor={familyName}>familyt name</label>
        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        <label htmlFor={phone}>phone</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor={photo}>image</label>
        <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <button type="submit">edit Rep ...</button>
        {!!err && <div>{err}</div>}
      </form>
    </React.Fragment>
  );
};
export default EditRep;
