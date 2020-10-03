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
            .then((res) => {
              if (!res) {
                const promTransfer = transferDepartureModel.create({
                  _id: uniqueStr,
                  hotelId: contact.hotelId,
                  date: contact.checkOut,
                  flightDeparture: contact.flightDeparture,
                });
                return Promise.all([contacts, promTransfer]);
                // .then((info) => {
                //   return Promise.all([contacts, info]);
                // })
                // .catch((err) => console.log(err));
              } else {
                return Promise.reject(
                  `no transfers added, maybe ${uniqueStr} already exists`
                );
              }
            })
            .then(([contacts, info]) =>
              res.status(200).json(`${uniqueStr} is added`)
            )
            .catch((err) => res.status(404).json(err));
        });
        // res.status(200).json(contacts);
      });
    },
  },
};
