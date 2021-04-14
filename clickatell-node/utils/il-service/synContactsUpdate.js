const MongoClient = require('mongodb').MongoClient;
const MockContacts = require('../../MOCK');
const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, function (err, client) {
  var db = client.db('messages');
  if (err) {
    throw err;
  }
  // console.log(obj);
  MockContacts.map(async (contact) => {
    console.log(contact.resId);
    await db
      .collection('contacts')
      // .updateOne(
      //   { resId: contact.resId },
      //   { $set: { phone: contact.phone, checkIn: contact.checkIn, checkOut: contact.checkOut } }
      // )
      .findOneAndUpdate({ resId: contact.resId }, [
        {
          $set: {
            phone: contact.phone,
            checkIn: contact.checkIn,
            checkOut: contact.checkOut,
            flightArrival: contact.flightArrival,
            flightDeparture: contact.flightDeparture,
          },
        },
      ])
      .then((a) => {
        console.log('updated', a);
      })
      .catch((b) => console.log(b));
  });
  client.close();
});
