const { transferDepartureModel, contactModel } = require('../models');

module.exports = {
  get: {
    createTransfer: (req, res) => {
      //   const user = req.user;
      const checkOut = req.params.checkOut;
      contactModel.find({ checkOut }).then((contacts) => {
        contacts.map((contact) => {
          const uniqueStr =
            contact.checkOut + contact.flightDeparture + contact.hotelId;
          console.log(uniqueStr);
        });
        res.status(200).json(contacts);
      });
    },
  },
};
