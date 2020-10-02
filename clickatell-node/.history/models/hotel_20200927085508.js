const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
    //     maxlength: [50, 'It is allow maximum 50 characters!']
  },
  // resortId: {
  //   type: String,
  //   required: true,
  //   //     maxlength: [50, 'It is allow maximum 50 characters!']
  // },
  resortId: { type: String, ref: 'Resort' },
});

module.exports = mongoose.model('Hotel', hotelSchema);
