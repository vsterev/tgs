import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UserRating = () => {
  const { resId } = useParams();
  return (
    <div>
      <Helmet>
        <title>DMC Solvex - user rating</title>
      </Helmet>
      User Rating {resId}
    </div>
  );
};
export default UserRating;
