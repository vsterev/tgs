const { resortModel } = require('../models');

module.exports = {
  get: {
    allResorts: (req, res) => {
      //   const user = req.user;
      resortModel
        .find()
        .then((contacts) => {
          res.status(200).json({ status: true, contacts });
        })
        .catch((err) => {
          res.status(404).json({ status: false, msg: err });
          console.error(err);
        });
    },
  },
};
