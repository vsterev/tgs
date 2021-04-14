import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const UserRating = () => {
  const { resId } = useParams();
  return (
    <div>
      <Helmet>
        <title>TMS - Arrivals by date</title>
      </Helmet>
      User Rating {resId}
    </div>
  );
};
export default UserRating;
