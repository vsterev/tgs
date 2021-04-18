const { hotelModel, hotelRatingModel } = require('../models');

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
    ratting: (req, res) => {
      const { hotelId } = req.params;
      hotelRatingModel
        .findOne({ hotelId })
        // .lean()
        .populate([
          // { path: 'hotelId', model: 'Hotel', select: 'name' },
          { path: 'comments.resId', model: 'Contact' },
        ])
        .then((result) => {
          if (result) {
            console.log(result.staff);
            const averagRate = Math.round(
              (+result.staff +
                +result.cleanliness +
                +result.comfort +
                +result.location +
                +result.food +
                +result.value) /
                6
            );
            res.status(200).json({ rating: result, averagRate, maxRate: 10 });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
