const { hotelModel } = require('../models');

module.exports = {
  get: {
    allHotels: (req, res) => {
      //   const user = req.user;
      hotelModel
        .find()
        .populate([{ path: 'resortId', model: 'Resort', select: 'name' }])
        .then((hotels) => {
          res.status(200).json({ status: true, hotels });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
};
