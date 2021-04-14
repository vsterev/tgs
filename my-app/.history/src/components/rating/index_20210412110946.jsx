import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import contactService from '../../services/contacts';
const UserRating = () => {
  const { resId } = useParams();
  useEffect(() => {
    contactService.reservationInfo(resId).then((a) => console.log(a));
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
