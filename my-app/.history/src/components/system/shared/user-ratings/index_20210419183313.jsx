import React, { useEffect, useState } from 'react';
import voteService from '../../../../services/vote';
import parseCookie from '../../../../utils/parseCookie';
const UserRatings = () => {
  const [votes, setVotes] = useState('');
  useEffect(() => {
    const token = parseCookie('tgs-token');
    voteService
      .allVotes(token)
      .then((votes) => setVotes(votes))
      .catch(console.log);
  }, []);
  return (
    <div>
      <h3>User Ratings</h3>
      {votes &&
        votes.map((vote) => {
          return <div>{vote}</div>;
        })}
    </div>
  );
};
export default UserRatings;
