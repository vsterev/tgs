import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserRating = () => {
  const { resId } = useParams();
  return <div>User Rating {resId}</div>;
};
export default UserRating;
