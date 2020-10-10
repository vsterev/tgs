const { connect } = require('mongoose');
const { repModel } = require('../models');

module.exports = {
  get: {
    all: (req, res) => {
      //   const user = req.user;
      repModel
        .find()
        // .populate([{ path: 'hotels', model: 'Hotel', select: 'name' }])
        .populate([
          {
            path: 'hotels',
            model: 'Hotel',
            select: 'name',
            populate: { path: 'resortId', model: 'Resort', select: 'name' },
          },
        ])
        .then((reps) => {
          res.status(200).json({ status: true, reps });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    allHotelsByRep: (req, res) => {
      //   const user = req.user;
      const { repId } = req.params;
      repModel
        .findById(repId)
        .populate([
          {
            path: 'hotels',
            model: 'Hotel',
            select: 'name',
            populate: { path: 'resortId', model: 'Resort', select: 'name' },
          },
        ])
        .then((result) => {
          res.status(200).json({ status: true, hotels: result.hotels });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    allHotels: (req, res) => {
      //   const user = req.user;
      let allHotels = [];
      repModel
        .find()
        .then((result) => {
          result.map((curr) => (allHotels = allHotels.concat(curr.hotels)));
          allHotels = [...new Set(allHotels)];
          res.status(200).json({ status: true, allHotels });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
  post: {
    add: (req, res) => {
      //   const user = req.user;
      const { firstName, familyName, phone, photo } = req.body;
      repModel
        .create({ firstName, familyName, phone, photo, hotels: [] })
        .then((added) => {
          res.status(200).json({ status: true, msg: 'Rep is added' });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    update: (req, res) => {
      //   const user = req.user;
      const updateObj = {};

      const { repId, firstName, familyName, phone, photo, hotels } = req.body;
      if (!repId) {
        return res.status(404).json('Invalid request - please enter repId.');
      }
      if (firstName) {
        updateObj.firstName = firstName;
      }
      if (familyName) {
        updateObj.familyName = familyName;
      }
      if (phone) {
        updateObj.phone = phone;
      }
      if (photo) {
        updateObj.photo = photo;
      }
      if (hotels && hotels.length !== 0) {
        updateObj.hotels = hotels;
      }
      repModel
        .findByIdAndUpdate(repId, updateObj, { new: true, runValidators: true })
        .then((updated) => {
          res.status(200).json({ status: true, msg: 'Rep props were updated' });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    delete: (req, res) => {
      //   const user = req.user;
      const { repId } = req.body;
      repModel
        .findByIdAndDelete(repId)
        .then((deleted) => {
          res.status(200).json({ status: true, msg: 'Rep was deleted' });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    // hotelAdd: (req, res) => {
    //   const user = req.user;
    //   const { repId, hotels } = req.body; //hotels trqbwa da e array
    //   repModel
    //     .findByIdAndUpdate(
    //       repId,
    //       { $push: { hotels: { $each: [hotels] } } },
    //       { new: true }
    //     )
    //     .then((rep) =>
    //       res.status(200).json({ status: true, msg: 'Hotels are added' })
    //     )
    //     .catch((err) => {
    //       res.status(404).json({ status: false, msg: err });
    //       console.error(err);
    //     });
    // },
    // hotelsUpdate: (req, res) => {
    //   const { user } = req;
    //   const { repId, hotels } = req.body;
    //   //update hotels List;
    //   repModel
    //     .findByIdAndUpdate(repId, { hotels })
    //     .then((rep) =>
    //       res.status(200).json({ status: true, msg: "Hotels are added" })
    //     )
    //     .catch((err) => {
    //       res.status(404).json({ status: false, msg: err });
    //       console.error(err);
    //     });
    // },
  },
};
