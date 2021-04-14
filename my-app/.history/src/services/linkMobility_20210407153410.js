const BulkSmsService = {
  manualSend: (data, token) => {
    return fetch(`http://localhost:4000/linkMobility/manual-send`, {
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
export default BulkSmsService;
