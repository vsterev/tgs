const mongoose = require('mongoose');
const transferSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique:true
  },
  date:{
    type:String,
    require:true
  },
  flightN:{
    type:String,
    require:true
  },
  hotelId:{
    type:String,
    ref:'Hotel'
  },
  checkPoint: {
    type:String
  },
  time: {
    type:String
  }
});
module.exports = mongoose.model('Transfer', transferSchema);
