const mongoose = require('mongoose');
const hotelSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  resortId: {
    type: String,
    ref: 'Resort', //pravi vryzka kym drugata kolekcia, v neya _id===resrortId
    // foreignField: 'resID',
    // justOne: true,
  },
});
module.exports = mongoose.model('Hotel', hotelSchema);
