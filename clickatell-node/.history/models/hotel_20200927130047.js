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
  resortId: {
    type: String,
    ref: 'Resort', //pravi vryzka kym drugata kolekcia, v neya _id===resrortId
    // foreignField: 'resID',
    // justOne: true,
  },
  // resID: { type: mongoose.Types.ObjectId, ref: 'Resort' },
  // resortId: { type: String, ref: 'Resort' },
  // villaId: { type: mongoose.Types.ObjectId, ref: 'Villa' } //example to see
});
// hotelSchema.virtual('resort', {
//   ref: 'Resort',
//   localField: 'resortId',
//   foreignField: 'resID',
//   justOne: true,
// });
module.exports = mongoose.model('Hotel', hotelSchema);
