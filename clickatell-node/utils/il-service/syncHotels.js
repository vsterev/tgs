const fetch = require('node-fetch');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const requestStr = `<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetHotels xmlns="http://www.megatec.ru/">
      <countryKey>4</countryKey>
      <regionKey>-1</regionKey>
      <cityKey>-1</cityKey>
    </GetHotels>
  </soap:Body>
</soap:Envelope>`;
fetch('http://evaluation.solvex.bg/iservice/integrationservice.asmx', {
  method: 'post',
  body: requestStr,
  headers: {
    'Content-Type': 'text/xml',
  },
})
  .then((res) => res.text())
  .then((xml) => {
    return parser
      .parseStringPromise(xml)
      .then(
        (result) =>
          result['soap:Envelope']['soap:Body'][0]['GetHotelsResponse'][0][
            'GetHotelsResult'
          ][0]['Hotel']
      )
      .catch((err) => console.log(err));
  })
  .then((hotels) => {
    // console.log(hotels);
    MongoClient.connect(url, function (err, client) {
      var db = client.db('messages');
      if (err) throw err;
      db.collection('hotels').drop();
      return hotels.forEach((hotel) => {
        const _id = +hotel.ID[0];
        const name = hotel.Name[0];
        const code = hotel.Code[0];
        const category = hotel.HotelCategoryID[0];
        const regionId = hotel.RegionID[0];
        const resortId = hotel.CityID[0];
        const obj = { _id, name, code, resortId, category, regionId };
        // console.log(obj);
        db.collection('hotels').insertOne(obj, function (err, res) {
          if (err) throw err;
          console.log(obj.name + ' inserted');
          client.close();
        });
      });
    });
  })
  .catch((err) => console.log(err));
