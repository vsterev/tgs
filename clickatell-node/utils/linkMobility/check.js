const crypto = require('crypto');
const fetch = require('node-fetch');
const linkMobilityCheck = (data) => {
  const api_secret = '$2y$10$9ruO/hrtIxJb.804MRWhGePCMFn0V7PVUPqi1hd5HFiTCbR7mq9pC';
  const api_key = '$2y$10$MWBcBQsMY1fDh2Gjp3tNyOmEj8JqQpXK2YwirwTqHCwhIhF0HoKpi';

  function getHash(d) {
    const hmac = crypto.createHmac('sha512', api_secret);
    hmac.update(d);
    return hmac.digest('hex');
  }
  const modifiedData = JSON.stringify({
    sms_id: data,
    service_id: 495,
  });
  return fetch('https://api-test.msghub.cloud/dlr', {
    method: 'post',
    body: modifiedData,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': api_key,
      'x-api-sign': getHash(modifiedData),
      Expect: '',
    },
  });
};
module.exports = linkMobilityCheck;
