import React, { useState } from 'react';
const AddRep = () => {
  const [firstName, setFirstName] = useState(null);
  const [familyName, setFamilyName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const formSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={formSubmit}>
      <label htmlFor={firstName}>first name</label>
      <input type="text" id="firstName" value={firstName} />
      <label htmlFor={familyName}>familyt name</label>
      <input type="text" id="familyName" value={familyName} />
      <label htmlFor={phone}>phone</label>
      <input type="text" id="setPhone" value={phone} />
      <button type="submit">add Rep ...</button>
    </form>
  );
};
export default AddRep;
