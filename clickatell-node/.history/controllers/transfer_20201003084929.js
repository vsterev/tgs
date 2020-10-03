const { transferDepartureModel, contactModel } = require('../models');

module.exports = {
  get: {
    allResorts: (req, res) => {
      //   const user = req.user;
      resortModel
        .find()
        .then((resorts) => {
          res.status(200).json({ status: true, resorts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
};
