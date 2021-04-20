import { DesktopMacSharp } from '@material-ui/icons';
import config from './config';
const VoteService = {
  userVote: (data) => {
    return fetch(`${config.backEndUrl}/vote/reservation`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  },
  allVotes: () => {
    return fetch(`${config.backEndUrl}/vote/all`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => res.json())
      .catch((e) => {
        console.error(e);
      });
  },
};
export default VoteService;
