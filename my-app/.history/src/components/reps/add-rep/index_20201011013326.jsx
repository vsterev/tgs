import React, { useState } from 'react';
import repsService from '../../../services/reps';
import parseCookie from '../../../utils/parseCookie';
const AddRep = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const token = parseCookie('tgs-token');
  const formSubmit = (e) => {
    e.preventDefault();
    const data = { firstName, familyName, phone, photo };
    repsService.add(data, token);
  };
  return (
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
    </form>
  );
};
export default AddRep;
