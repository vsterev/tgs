const crypto = require('crypto');
const fetch = require('node-fetch');
const linkMobilitySender = (data) => {
  const api_secret = '$2y$10$9ruO/hrtIxJb.804MRWhGePCMFn0V7PVUPqi1hd5HFiTCbR7mq9pC';
  const api_key = '$2y$10$MWBcBQsMY1fDh2Gjp3tNyOmEj8JqQpXK2YwirwTqHCwhIhF0HoKpi';

  function getHash(d) {
    const hmac = crypto.createHmac('sha512', api_secret);
    hmac.update(d);
    return hmac.digest('hex');
  }
  let newD = [];
  data.forEach(
    (item) =>
      (newD = newD.concat({
        msisdn: item.to,
        sc: 'ViberTest',
        text: item.message,
        service_id: 495,
        fallback: [{ sms: item.message }],
      }))
  );
  newD = JSON.stringify(newD);
  return fetch('https://api-test.msghub.cloud/send', {
    method: 'post',
    body: newD,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': api_key,
      'x-api-sign': getHash(newD),
      Expect: '',
    },
  });
};
module.exports = linkMobilitySender;
