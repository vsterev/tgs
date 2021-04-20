import React, { useEffect, useState } from 'react';
import voteService from '../../../../services/vote';
import parseCookie from '../../../../utils/parseCookie';
const UserRatings = () => {
  useEffect(() => {
    const token = parseCookie('tgs-token');
    voteService.allVotes(token).then(console.log).catch(console.log);
  }, []);
  return <div>User Rating</div>;
};
export default UserRatings;
