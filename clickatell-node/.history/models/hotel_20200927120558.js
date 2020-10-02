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
    // required: true,
    //     maxlength: [50, 'It is allow maximum 50 characters!']
  },
  // resortId: { type: String, ref: 'Resort' },
  // villaId: { type: mongoose.Types.ObjectId, ref: 'Villa' } //example to see
});
hotelSchema.virtual('author', {
  ref: 'User',
  localField: 'authorId',
  foreignField: '_id',
  justOne: true,
});
module.exports = mongoose.model('Hotel', hotelSchema);
