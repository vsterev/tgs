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
              if (!res & contact.hasTransfer) {
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
              } else if (!contact.hasTransfer) {
                return new Promise((resolve, reject) =>
                  resolve(`no transfers added, ${uniqueStr} has no transfer`)
                );
              } else {
                return new Promise((resolve, reject) =>
                  resolve(`no transfers added, ${uniqueStr} already exists`)
                );
              }
            })
            // .then(([contacts, info]) => console.log(`${uniqueStr} is added`))
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
        res.status(200).json(contacts);
      });
    },
  },
};
