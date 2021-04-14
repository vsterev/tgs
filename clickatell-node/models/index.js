const contactModel = require('./contact');
const userModel = require('./user');
const tokenBlacklistModel = require('./token-blacklist');
const resortModel = require('./resort.js');
const hotelModel = require('./hotel.js');
const repModel = require('./rep.js');
const userVoteModel = require('./userVote');
const hotelRatingModel = require('./hotelRating');
const transferDepartureModel = require('./transferDeparture');
module.exports = {
  contactModel,
  userModel,
  tokenBlacklistModel,
  resortModel,
  hotelModel,
  repModel,
  userVoteModel,
  hotelRatingModel,
  transferDepartureModel,
};
