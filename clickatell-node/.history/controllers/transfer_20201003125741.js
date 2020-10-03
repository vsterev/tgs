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
          console.log(uniqueStr);

          transferDepartureModel
            .findById(uniqueStr)
            .then((res) => {
              if (!res) {
                transferDepartureModel
                  .create({
                    _id: uniqueStr,
                    hotelId: contact.hotelId,
                    date: contact.checkOut,
                    flightDeparture: contact.flightDeparture,
                  })
                  .then((info) => res.status(200).json(info))
                  .catch((err) => console.log(err));
              }
            })
            .then((result) => console.log(result))
            .catch((err) => console.log(err));
        });
        res.status(200).json(contacts);
      });
    },
  },
};
