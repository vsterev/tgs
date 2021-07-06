import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
        <thead>
          <tr>
            <th>reservation</th>
            <th>hotel</th>
            <th>name</th>
            <th>phone</th>
            <th>check-in</th>
            <th>location</th>
            <th>staff</th>
            <th>value</th>
            <th>cleanliness</th>
            <th>comfort</th>
            <th>food</th>
            <th>comment</th>
            <th>average rate</th>
          </tr>
        </thead>
        <tbody>
          {!!votes &&
            votes.map((vote, i) => {
              return (
                <tr key={i}>
                  <td>{vote.resId._id}</td>
                  <td>
                    <Link
                      to="/#"
                      onClick={() =>
                        window.open(
                          `/admin/hotel-rating/${vote.hotelId._id}`,
                          'message',
                          'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no, width=1000, height=700, top=100, left=300'
                        )
                      }>
                      {vote.hotelId.name}
                    </Link>
                  </td>
                  <td>{vote.resId.name}</td>
                  <td>{vote.resId.phone}</td>
                  <td>{vote.resId.checkIn}</td>
                  <td>{vote.location}</td>
                  <td>{vote.staff}</td>
                  <td>{vote.value}</td>
                  <td>{vote.cleanliness}</td>
                  <td>{vote.comfort}</td>
                  <td>{vote.food}</td>
                  <td>{vote.hotelComment}</td>
                  <td>
                    {Math.round(
                      (vote.location + vote.staff + vote.value + vote.cleanliness + vote.comfort + vote.food) / 6
                    )}{' '}
                    / 10
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};
export default UserRatings;