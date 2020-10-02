const contactModel = require('./contact');
const userModel = require('./user');
const tokenBlacklistModel = require('./token-blacklist');
const resortModel = requite('./resort.js');
const hotelModel = requite('./hotel.js');
const repModel = requite('./rep.js');

module.exports = {
  contactModel,
  userModel,
  tokenBlacklistModel,
  resortModel,
  hotelModel,
  repModel,
};
