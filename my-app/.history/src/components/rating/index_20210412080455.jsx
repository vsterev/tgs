import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UserRating = () => {
  const { resId } = useParams();
  useEffect(() => {}, []);
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
