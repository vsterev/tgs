import config from './config';
const VoteService = {
  userVote: (data) => {
    return fetch(`${config.backEndUrl}/reservation/vote`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  },
  allVotes: data,
};
export default VoteService;
