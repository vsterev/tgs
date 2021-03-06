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

          transferDepartureModel.findById(uniqueStr).then((res) => {
            if (res) {
              console.log('има вече трансфер');
              return;
            } else {
              transferDepartureModel
                .create({
                  _id: uniqueStr,
                  hotelId: contact.hotelId,
                  date: contact.checkOut,
                  flightDeparture: contact.flightDeparture,
                })
                .then((info) => res.status(200).json(info));
              console.log('няма трансфер');
              return;
            }
            // console.log(res);
          });
        });
        res.status(200).json(contacts);
      });
    },
  },
};
