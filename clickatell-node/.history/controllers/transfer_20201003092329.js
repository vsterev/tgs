const { transferDepartureModel, contactModel } = require('../models');

module.exports = {
  get: {
    createTransfer: (req, res) => {
      //   const user = req.user;
      const checkOut = req.params.checkOut;
      contactModel.find({ checkOut }).then((contacts) => {
        res.status(200).json(contacts);
      });
    },
  },
};
