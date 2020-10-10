var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://127.0.0.1:27017';
MongoClient.connect(url, function (err, client) {
  if (err) throw err;
  var db = client.db('messages');
  var data = [
    {
      _id: 27,
      name: 'Vratsa',
      regionId: '4',
      countryId: '4',
      code: 'VRA',
    },
    { _id: 7, name: 'Varna', regionId: '2', countryId: '4', code: 'VAR' },
    { _id: 74, name: 'Troyan', regionId: '4', countryId: '4', code: 'TRO' },
  ];
  db.collection('resorts').insertMany(data, function (err, res) {
    if (err) throw err;
    console.log('1 record inserted');
    client.close();
  });
});
