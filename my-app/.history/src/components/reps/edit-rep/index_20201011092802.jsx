import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import parseCookie from '../../../utils/parseCookie';
import repsService from '../../../services/reps';
const EditRep = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [err, setErr] = useState('');
  const { repId } = useParams();
  const history = useHistory();
  const token = parseCookie('tgs-token');
  useEffect(() => {
    repsService.details(repId, token).then((a) => {
      if (!a.status) {
        setErr(`Error fetching data for user with id-${repId}`);
        return;
      }
      setFirstName(a.result.firstName);
      setFamilyName(a.result.familyName);
      setPhone(a.result.phone);
      setFirstName(a.result.firstName);
    });
  }, []);
  const formSubmit = (e) => {
    const data = { repId, firstName, familyName, phone, photo };
    e.preventDefault();
    repsService
      .repUpdate(data, token)
      .then((a) => {
        if (!a.status) {
          setErr(a.msg.message);
          return;
        }
        history.push(`/admin/reps/all`);
      })
      .catch((er) => console.log(er));
  };
  const deleteRep = (e) => {
    e.preventDefault();
    if (window.confirm('Please confirm delete process !')) {
      repsService
        .delete({ repId }, token)
        .thena((a) => {
          if (!a.status) {
            setErr(a.status.msg);
            return;
          }
          history.push('/reps/all');
        })
        .catch((err) => setErr(err.msg));
    }
  };
  return (
    <React.Fragment>
      <h3>Edit representative</h3>
      <form onSubmit={formSubmit}>
        <label htmlFor="firstName">first name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="familyName">familyt name</label>
        <input type="text" id="familyName" value={familyName} onChange={(e) => setFamilyName(e.target.value)} />
        <label htmlFor="phone">phone</label>
        <input type="text" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
        <label htmlFor="photo">image</label>
        <input type="text" id="photo" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        <button type="submit">edit Rep ...</button>
        <button type="button" onClick={deleteRep}>
          delete rep
        </button>
        {!!err && <div>{err}</div>}
      </form>
    </React.Fragment>
  );
};
export default EditRep;
