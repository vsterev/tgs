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
      <table>
        <tr>
          <td>reservation</td>
          <td>hotel</td>
          <td>name</td>
          <td>location</td>
          <td>staff</td>
          <td>value</td>
          <td>cleanliness</td>
          <td>comfort</td>
          <td>food</td>
          <td>comment</td>
        </tr>
        {votes &&
          votes.map((vote) => {
            return (
              <tr>
                <td>{vote.resId._id}</td>
                <td>{vote.hotelId.name}</td>
                <td>{vote.name}</td>
                <td>{vote.staff}</td>
                <td>{vote.value}</td>
                <td>{vote.cleanliness}</td>
                <td>{vote.comfort}</td>
                <td>{vote.food}</td>
                <td>{vote.comment}</td>
              </tr>
            );
          })}
      </table>
    </div>
  );
};
export default UserRatings;
