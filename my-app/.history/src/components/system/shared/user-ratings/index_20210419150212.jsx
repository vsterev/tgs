import React, { useEffect } from 'react';
import voteService from '../../../../services/vote';

const UserRatings = () => {
  useEffect(() => {
    voteService.allVotes().then(console.log).catch(console.log);
  }, []);
  return <div>User Rating</div>;
};
export default UserRatings;
