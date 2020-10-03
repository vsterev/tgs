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
              console.log('няма трансфер');
            }
            // console.log(res);
          });
        });
        res.status(200).json(contacts);
      });
    },
  },
};
