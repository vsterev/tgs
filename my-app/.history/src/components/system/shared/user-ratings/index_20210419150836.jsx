import React, { useEffect } from 'react';
import voteService from '../../../../services/vote';
import parseCookie from '../../../../utils/parseCookie';
const UserRatings = () => {
  useEffect(() => {
    const token = parseCookie('tgs-token');
    voteService.allVotes().then(console.log).catch(console.log);
  }, []);
  return <div>User Rating</div>;
};
export default UserRatings;
