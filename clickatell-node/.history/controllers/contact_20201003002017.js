const { contactModel, repModel } = require('../models');
const sendMes = require('../api/newServ');
const sendMail = requite('../utils/sendMail.js');
module.exports = {
  get: {
    all: (req, res) => {
      //   const user = req.user;
      contactModel
        .find()
        .populate({
          path: 'hotelId',
          model: 'Hotel',
          populate: { path: 'resortId', model: 'Resort', select: 'name' },
        })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkOut: (req, res) => {
      const { date } = req.params;
      console.log(date);
      contactModel
        .find({ checkOut: date })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
          //   contacts.map((user) =>
          //     sendMes(
          //       `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //     Your checkout date is ${user.checkOut}`,
          //       user.phone,
          //       'sms'
          //     )
          //   );
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkInMessage: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date })
        .then((contacts) => {
          contacts.map((contact) => {
            return repModel
              .find({ hotels: { $in: contact.hotelId } })
              .then((rep) => {
                if (rep[0]) {
                  console.log(rep[0].familyName, contact.hotelId, contact.name);
                  sendMes(
                    `Welcome to Bulgaria ${contact.name}.Solvex is your DMC - please visit https://www.solvex.bg/${contact.resId} for more info.Travel with smile :-).
                    Your rep is ${rep[0].familyName} on phone ${rep[0].phone}`,
                    contact.phone,
                    'whatsapp'
                  );
                } else {
                  console.log(contact.hotelId + ' has no rep attached');
                }
              });
          });
          // console.log(repInfo)
          // contacts.map((user) =>
          //   sendMes(
          //     `Welcome to Bulgaria ${user.name}.Solvex is your DMC - please visit https://www.solvex.bg/${user.resId} for more info.Travel with smile :-).
          //   Your checkout date is ${user.checkOut}`,
          //     user.phone,
          //     'sms'
          //   )
          // );
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkIn: (req, res) => {
      const { date } = req.params;
      contactModel
        .find({ checkIn: date })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
  post: {
    addComment: (req, res) => {
      //   const user = req.user;
      //   const { reservationId, comment } = req.body;
      //   reservationModel
      //     .findByIdAndUpdate(
      //       reservationId,
      //       { $push: { comments: comment } },
      //       { new: true }
      //     )
      //     .then((updated) => {
      //       res.status(200).json({ status: true, msg: 'Comment are added' });
      //       console.log(updated);
      //     })
      //     .catch((err) => {
      //       res.status(404).json({ status: false, msg: err });
      //       console.error(err);
      //     });
    },
  },
};
