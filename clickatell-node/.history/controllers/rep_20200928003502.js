const { connect } = require('mongoose');
const { repModel } = require('../models');

module.exports = {
  get: {
    all: (req, res) => {
      //   const user = req.user;
      repModel
        .find()
        .populate([{ path: 'hotels', model: 'Hotel', select: 'name' }])
        .then((reps) => {
          res.status(200).json({ status: true, reps });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
  post: {
    add: (req, res) => {
      const { firstName, familyName, phone, photo } = req.body;
      repModel
        .create({ firstName, familyName, phone, photo, hotels: [] })
        .then((added) => {
          res.status(200).json({ status: true, msg: 'Comment are added' });
          console.log(updated);
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    hotelAdd: (req, res) => {
      const user = req.user;
      const { repId, hotels } = req.body;
      repModel
        .findByIdAndUpdate(
          repId,
          { $push: { hotels: { $each: [hotels] } } },
          { new: true }
        )
        .then((rep) =>
          res.status(200).json({ status: true, msg: 'Hotels are added' })
        )
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
};
