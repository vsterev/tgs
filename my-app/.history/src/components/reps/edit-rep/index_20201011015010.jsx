import React, {useState} from 'react'
import parseCookie from '../../../utils/parseCookie';
const EditRep = ()=>{
    const [firstName, setFirstName] = useState('');
    const [familyName, setFamilyName] = useState('');
    const [phone, setPhone] = useState('');
    const [photo, setPhoto] = useState('');
    const [err, setErr] = useState('');
    const token = parseCookie('tgs-token');
return (

)
}
export default EditRep;