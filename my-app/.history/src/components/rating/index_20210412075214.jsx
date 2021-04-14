import React, { useEffect, useParams } from 'react';

const UserRating = () => {
  const { resId } = useParams();
  return <div>User Rating {resId}</div>;
};
export default UserRating;
