const mongoose = require('mongoose');
const repSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z ]{5,}$/, 'Name should contains minimum 5 english letters'],
  },
  familyName: {
    type: String,
    required: true,
    match: [/^[a-zA-Z ]{5,}$/, 'Name should contains minimum 5 english letters'],
  },
  phone: {
    type: String,
    required: true,
    //     maxlength: [50, 'It is allow maximum 50 characters!']
  },
  photo: {
    type: String,
    // required: [true, 'Please add one photo at least !'],
    match: [/^(https?)\:\/\/.*/, 'Image url should begins with http or https!'],
  },
  languages: {
    type: [String],
  },
  hotels: [{ type: String, ref: 'Hotel' }],
});

module.exports = mongoose.model('Rep', repSchema);
