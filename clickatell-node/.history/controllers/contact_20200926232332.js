const { contactModel } = require('../models');
const sendMes = require('./api/newServ');

module.exports = {
  get: {
    all: (req, res) => {
      //   const user = req.user;
      contactModel
        .find()
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
    checkOut: (req, res) => {
      const { checkOut } = req.params;
      console.log(checkOut);
      contactModel
        .find({ checkOut })
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
          se;
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
