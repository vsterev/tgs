import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import parseCookie from '../../../utils/parseCookie';
import repsService from '../../../services/reps';
const EditRep = () => {
  const [firstName, setFirstName] = useState('');
  const [familyName, setFamilyName] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [languages, setLanguages] = useState(null);
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
      setLanguages(a.result.languages);
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
        .then((a) => {
          if (!a.status) {
            setErr(a.status.msg);
            return;
          }
          history.push('/admin/reps/all');
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
        <label htmlFor="ro">romanian</label>
        <input
          type="checkbox"
          id="ro"
          name="ro"
          checked={languages!.includes('ro')}
          onChange={(e) => langSetter(e.target.name)}
        />
        <label htmlFor="ru">russian</label>
        <input type="checkbox" id="ru" name="ru" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="cz">czech</label>
        <input type="checkbox" id="cz" name="cz" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="pl">polish</label>
        <input type="checkbox" id="pl" name="pl" onChange={(e) => langSetter(e.target.name)} />
        <label htmlFor="en">english</label>
        <input type="checkbox" id="en" name="en" onChange={(e) => langSetter(e.target.name)} />
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
