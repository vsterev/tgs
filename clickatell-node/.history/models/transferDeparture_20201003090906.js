const mongoose = require('mongoose');
const transferDepartureSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    require: true,
  },
  flightDeparture: {
    type: String,
    require: true,
  },
  hotelId: {
    type: String,
    ref: 'Hotel',
  },
  checkPoint: {
    type: String,
  },
  time: {
    type: String,
  },
});
module.exports = mongoose.model('TransferDeparture', transferDepartureSchema);
