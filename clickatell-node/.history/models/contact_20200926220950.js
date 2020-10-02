const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a title !'],
  },
  resId: {
    type: String,
    required: [true, 'Please enter a reservation Number !'],
    //     maxlength: [50, 'It is allow maximum 50 characters!']
  },
  city: {
    type: String,
    required: [true, 'Please enter city !'],
  },
  hotel: {
    type: String,
    required: [true, 'Please enter hotel !'],
  },
  checkIn: {
    type: String,
    required: true,
  },
  checkOut: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  flightArrival: {
    type: String,
  },
  flightDeparture: {
    type: String,
  },
  //   users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  //   creatorId: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Contact', contactSchema);
