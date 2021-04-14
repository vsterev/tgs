const mongoose = require('mongoose');
const hotelRatingSchema = new mongoose.Schema({
  hotelId: {
    type: String,
    ref: 'Hotel',
    unique: true,
  },
  staff: {
    type: Number,
  },
  cleanliness: {
    type: Number,
  },
  comfort: {
    type: Number,
  },
  location: {
    type: Number,
  },
  food: {
    type: Number,
  },
  value: {
    type: Number,
  },
  comments: [{ comment: { type: String }, resId: { type: String, ref: 'Contact' } }],
});

module.exports = mongoose.model('HotelRating', hotelRatingSchema);
