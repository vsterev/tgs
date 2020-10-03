const { transferDepartureModel, contactModel } = require('../models');

module.exports = {
  get: {
    createTransfer: (req, res) => {
      //   const user = req.user;
      const checkOut = req.params.checkOut;
      contactModel.find({ checkOut }).then((contacts) => {
        contacts.map((contact) => {
          const uniqueStr =
            contact.checkOut.split('.').join('') +
            '-' +
            contact.flightDeparture +
            '-' +
            contact.hotelId;

          transferDepartureModel
            .findById(uniqueStr)
            .then((res) => console.log(res));
          console.log(uniqueStr);
        });
        res.status(200).json(contacts);
      });
    },
  },
};
