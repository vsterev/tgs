const mongoose = require('mongoose');
const userVoteSchema = new mongoose.Schema({
  resId: {
    type: String,
    required: true,
    // match: [/^[a-zA-Z ]{5,}$/, 'Name should contains minimum 5 english letters'],
    unique: true,
  },
  hotelId: {
    type: String,
    ref: 'Hotel',
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
  hotelComment: {
    type: String,
  },
  reps: [{ type: String, ref: 'Rep' }],
});

module.exports = mongoose.model('UserVote', userVoteSchema);
