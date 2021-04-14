import config from './config'
const LinkMobilityService = {
  manualSend: (data, token) => {
    return fetch(`${config.backEndUrl}/linkMobility/manual-send`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: { 'Content-type': 'application/json', Authorization: token },
    })
      .then((res) => {
        if (!res) {
          console.error('error fetching from linkMobility API');
          return;
        }
        console.log('tuk e');
        return res.json();
        // }
        // return res.status(400);
      })
      .catch((e) => {
        console.error(e);
      });
  },
};
export default LinkMobilityService;
