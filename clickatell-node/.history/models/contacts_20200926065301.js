const mongoose = require('mongoose');
const contactsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a title !'],
    match: [
      /^(\w\s?){4,}$/,
      'Name should contains not less than 4 english letter, numbers and whitespase!',
    ],
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
    required,
  },
  checkOut: {
    type: String,
    required,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  //   users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
  //   creatorId: { type: mongoose.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Contact', contactsSchema);
