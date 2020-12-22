import React, { useState } from 'react';
const AddRep = () => {
  const [firstName, setFirstName] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [photo, setPhoto] = useState(null);
  const formSubmit = (e) => {
    e.preventDefault();
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
