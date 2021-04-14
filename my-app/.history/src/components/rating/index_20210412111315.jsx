import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
const UserRating = () => {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState('null');
  useEffect(() => {
    contactService.reservationInfo(resId).then((res) => {
      console.log(res);
      setResInfo(res.contact);
    });
  }, []);
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      User Rating for reservation: {resId}
    </div>
  );
};
export default UserRating;
