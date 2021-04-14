const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const requestStr = `
  <soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetCities xmlns="http://www.megatec.ru/">
      <countryKey>4</countryKey>
      <regionKey>-1</regionKey>
    </GetCities>
  </soap:Body>
</soap:Envelope>`;
// const syncCities = () => {
return fetch('http://evaluation.solvex.bg/iservice/integrationservice.asmx', {
  method: 'post',
  body: requestStr,
  headers: {
    'Content-Type': 'text/xml',
  },
})
  .then((res) => res.text())
  .then((xml) => {
    return parser.parseStringPromise(xml);
  })
  .then((result) => result['soap:Envelope']['soap:Body'][0]['GetCitiesResponse'][0]['GetCitiesResult'][0]['City'])
  .then((cities) => {
    MongoClient.connect(url, function (err, client) {
      var db = client.db('messages');
      if (err) throw err;
      db.collection('resorts').drop();
      return cities.forEach((city) => {
        const _id = +city.ID[0];
        const name = city.Name[0];
        const regionId = city.RegionID[0];
        const countryId = city.CountryID[0];
        const code = city.Code[0];
        const obj = { _id, name, regionId, countryId, code };
        // console.log(obj);
        db.collection('resorts').insertOne(obj, function (err, res) {
          if (err) throw err;
          console.log(obj.name + ' inserted');
          client.close();
        });
      });
    });
  })
  .catch((err) => console.log(err));
// };
// module.exports = syncCities;
