const MongoClient = require('mongodb').MongoClient;
const MockContacts = require('../../MOCK');
const url = 'mongodb://127.0.0.1:27017';

MongoClient.connect(url, function (err, client) {
  var db = client.db('messages');
  if (err) {
    throw err;
  }
  // console.log(obj);
  //zapisva wsichki bez da powtaria veche zapisani
  db.collection('contacts')
    .insertMany(MockContacts, { ordered: false })
    .then((a) => {
      console.log('prodyljava', a);
    })
    .catch(console.log);
  client.close();
});
