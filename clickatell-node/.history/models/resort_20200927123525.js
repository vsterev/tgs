const mongoose = require('mongoose');
const resortSchema = new mongoose.Schema({
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
    required: true,
    //     maxlength: [50, 'It is allow maximum 50 characters!']
  },
});

module.exports = mongoose.model('Resort', resortSchema);
