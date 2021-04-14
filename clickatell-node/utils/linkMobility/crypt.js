const crypto = require('crypto');

const api_secret = 'vasko-secret';

function getHash(d) {
  crypto.createCipheriv('aes-256-cbc', key, d);
  hmac.update(d);
  return hmac.digest('hex');
}
function decription(d) {
  const hmac = crypto.decription('sha512', api_secret);
  return hmac.update(d);
  //   return hmac.digest('hex');
}
const crStr = getHash('HIS201501');
console.log(crStr);
const deCrStr = decription(crStr);
console.log(deCrStr);
