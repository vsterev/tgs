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
  const submitHandler = () => {
    console.log('clicked');
  };
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      <h3>User Rating for reservation: {resId}</h3>
      <div>
        hotel: {resInfo?.hotelId?.name} / {resInfo?.hotelId?.resortId?.name}
      </div>
      <form
        onSubmit={() => {
          submitHandler();
        }}>
        <input type="text"></input>
      </form>
      {JSON.stringify(resInfo)}
    </div>
  );
};
export default UserRating;
